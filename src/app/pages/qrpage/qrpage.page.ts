import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  Barcode,
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-qrpage',
  templateUrl: './qrpage.page.html',
  styleUrls: ['./qrpage.page.scss'],
})
export class QrpagePage implements OnInit {
  public barcodes: Barcode[] = [];
  public qrData1: any = {};
  secciones: any[] = [];
  seccion_id: string | null = null;
  usuario: any={};
  public qrRead = false;
  asistencia: any[] = [];
  
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {}

  goToDash() {
    setTimeout(() => {
      this.router.navigate(['/dashboard-alumnos']);
    }, 3000);
  }

  ubicacionActual() {
    return new Promise<{ lat: number; lon: number }>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            reject('Error al obtener la ubicación');
          }
        );
      } else {
        reject('Geolocalización no es soportada por este navegador');
      }
    });
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
  getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la tierra en km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distancia en km
    return d * 1000; // Distancia en metros
  }
  public async scanQR(): Promise<void> {
    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });
  
    if (barcodes.length > 0) {
      this.qrData1 = JSON.parse(barcodes[0].rawValue);
      console.log('QR DATA:', this.qrData1);
      const qrData = JSON.parse(barcodes[0].rawValue);
      const currentLocation = await this.ubicacionActual();
  
      console.log('Ubicación del QR:', qrData.latitud, qrData.longitud);
      console.log('Ubicación actual:', currentLocation.lat, currentLocation.lon);
  
      const distance = this.getDistanceFromLatLonInM(qrData.latitud, qrData.longitud, currentLocation.lat, currentLocation.lon);
  
      console.log('Distancia:', distance);
  
      if (distance <= 1000000) {
        const userData = window.localStorage.getItem('userData');
        if (userData) {
          const rut = JSON.parse(userData).rut_alumno;
          qrData.rut = rut;
          console.log('ID de la sección del QR:', qrData.id_seccion);
          if (qrData.id_seccion === this.seccion_id){
 
            console.log('API')
            this.qrRead = true;

            // Agrega la información del QR y del usuario a la matriz asistencia
            this.asistencia.push({
              ...qrData,
              ...this.usuario,
            });
            console.log(this.asistencia)
          } else {
            console.error('La ID de la sección del QR no coincide con ninguna de las secciones del estudiante');
          }
        }
      } else {
        console.error('La ubicación del QR no está dentro del rango permitido');
      }
    }
  }


  registrarAsistencia(){
    if (this.asistencia.length > 0) {
      const rut = this.asistencia[0].rut;
      const clase = this.asistencia[0].id_clase;
      const fecha= this.asistencia[0].fecha;
      const estado= 'Presente';

      const body = {
        rut_alumno: `https://osolices.pythonanywhere.com/alumnos/${rut}/`,
        id_clase: `https://osolices.pythonanywhere.com/clases/${clase}/`,
        fecha: fecha,
        estado: estado
      };

      console.log(body);

      this.http
        .post('https://osolices.pythonanywhere.com/asistencias/', body)
        .subscribe(response => {
          console.log(response);
          this.presente('!Estás Presente¡');
          this.qrRead = false;
        }, error => {
          console.error(error);
          this.presente('Ya estas presente');
        });
    } else {
      console.log('El array asistencia está vacío');
    }
}

  presente(mensaje: string) {
    const toast = document.createElement('ion-toast');
    toast.message = mensaje;
    toast.duration = 2000;

    document.body.appendChild(toast);
    return toast.present();
  }


  
  
  isGoogleBarcodeScannerModuleAvailable = async () => {
    const { available } = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    
    if (!available) {
      this.installGoogleBarcodeScannerModule();
    }
    
    return available;
  };
  
  
  installGoogleBarcodeScannerModule = async () => {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  };

  datosUsuario(){
    const userData = window.localStorage.getItem('userData');
    if (userData) {
      this.usuario.rut = JSON.parse(userData).rut_alumno;
      this.usuario.nombre = JSON.parse(userData).nombre;
      this.usuario.apellido = JSON.parse(userData).apellido;
    }
  }
  ngOnInit() {
    this.seccion_id = this.route.snapshot.paramMap.get('id_seccion');
    console.log('ID SECCION: ', this.seccion_id);
    this.datosUsuario();
    this.isGoogleBarcodeScannerModuleAvailable();
  }

  finalizar(){
    this.router.navigate([`/dashboard-alumno`]);
  }
}
