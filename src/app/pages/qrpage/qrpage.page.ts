import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-qrpage',
  templateUrl: './qrpage.page.html',
  styleUrls: ['./qrpage.page.scss'],
})
export class QrpagePage implements OnInit {

  usuario: any={};

  asistencia: any[] = [];

  asignacion: any;

  lat?: number;
  lng?: number;
  timestamp?: number;
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {}
  

  goToDash() {
    setTimeout(() => {
      this.router.navigate(['/dashboard-alumnos']);
    }, 3000);
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

  datosUsuario(){
    const userData = window.localStorage.getItem('userData');
    if (userData) {
      this.usuario.rut = JSON.parse(userData).rut_alumno;
      this.usuario.nombre = JSON.parse(userData).nombre;
      this.usuario.apellido = JSON.parse(userData).apellido;
    }
  }
  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.asignacion = params;
    });
    const options: PositionOptions = {
      enableHighAccuracy: true,
      maximumAge: 0, 
      timeout: 10000
    };
    const coordinates = await Geolocation.getCurrentPosition(options);
    console.log('Current position:', coordinates);

    this.lat = coordinates.coords.latitude;
    this.lng = coordinates.coords.longitude;
    console.log(this.lat)
    console.log(this.lng)
    this.timestamp = coordinates.timestamp;
    console.log('QRPage lat, lng:', this.lat, this.lng);

  }
  

  finalizar(){
    this.router.navigate([`/dashboard-alumno`]);
  }
}
