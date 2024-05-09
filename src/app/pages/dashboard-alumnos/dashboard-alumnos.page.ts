import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './../../auth-service.service';
import {
  Barcode,
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-dashboard-alumnos',
  templateUrl: './dashboard-alumnos.page.html',
  styleUrls: ['./dashboard-alumnos.page.scss'],
})
export class DashboardAlumnosPage implements OnInit {
  public barcodes: Barcode[] = [];
  secciones: any[] = [];


  constructor(private router: Router, private http: HttpClient,private authService: AuthServiceService) {}

  getAsignaturasEstudiante() {
    const userData = window.localStorage.getItem('userData');
    console.log(userData)
    if (userData) {
      const rut = JSON.parse(userData).rut_alumno;
      console.log(rut)
      this.http
        .get(`https://osolices.pythonanywhere.com/alumno_seccion/`)
        .subscribe((dataAs: any) => {
          const seccionesEstudiante = dataAs.filter((dataAs: any) => dataAs.rut_alumno === rut);
          console.log(seccionesEstudiante)

          seccionesEstudiante.forEach((seccion: any) => {
            this.http
              .get(`https://osolices.pythonanywhere.com/secciones/`)
              .subscribe((dataS: any) => {
                const seccionEstudiante = dataS.filter((dataS: any) => dataS.id_seccion === seccion.id_seccion);
                console.log('S: ', seccionEstudiante)
                             
                const asignatura = seccionEstudiante[0].id_asignatura;
                const descripcion = seccionEstudiante[0].descripcion;
                console.log(descripcion)
                console.log(asignatura)
                seccion.descripcion= descripcion;
                if (asignatura) {
                  console.log('asignatura:', asignatura);
                  
                  const asignaturaId = asignatura.split('/').slice(-2, -1)[0];
                  if (asignaturaId) {
                    console.log('asignaturaId:', asignaturaId);
      
                    this.http
                      .get(
                        `https://osolices.pythonanywhere.com/asignaturas/${asignaturaId}`
                      )
                      .subscribe((asignaturaData: any) => {
                        const nombre = asignaturaData.nombre;
                        const color = asignaturaData.color;
                        console.log('color:', color);
      
                        seccion.nombre = nombre;
                        seccion.color = color.toLowerCase();
                        this.secciones.push(seccion);
                      });
                  }
                }
              });
          });
        }); 
    }
}


  
  logOut() {
    this.authService.logout(); // Llama al método logout de AuthServiceService aquí
    this.router.navigate(['/login']);
  }
 

  ngOnInit() {
    let element = document.getElementById('navbarToggleExternalContent');
    if (element) {
      let bsCollapse = new bootstrap.Collapse(element, {
        toggle: false,
      });
    }
    this.getAsignaturasEstudiante();
  }

  
}
