import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSegment } from '@ionic/angular';
import * as bootstrap from 'bootstrap';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './../../auth-service.service';

@Component({
  selector: 'app-dashboard-profesor',
  templateUrl: './dashboard-profesor.page.html',
  styleUrls: ['./dashboard-profesor.page.scss'],
})
export class DashboardProfesorPage implements OnInit {
  selectedDay: string = 'todos';
  secciones: any[] = [];
  usuario: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}

  ngAfterViewInit() {
    let element = document.getElementById('navbarToggleExternalContent');
    if (element) {
      let bsCollapse = new bootstrap.Collapse(element, {
        toggle: false,
      });
    }
  }

  getAsignaturasProfesor() {
    const userData = window.localStorage.getItem('userData');
  
    if (userData) {
      const rut = JSON.parse(userData).rut_profesor;
      console.log(rut);
      this.http
        .get(`https://osolices.pythonanywhere.com/profesores/`)
        .subscribe((data: any) => {
          console.log(data);
          if (data) {
            const profesorData = data.filter(
              (profesor: any) => profesor.rut_profesor === rut
            );
            console.log(profesorData);
  
            this.http
              .get(`https://osolices.pythonanywhere.com/secciones/`)
              .subscribe((secciones: any) => {
                const seccionesProfesor = secciones.filter(
                  (seccion: any) =>
                    seccion.rut_profesor ===
                    `https://osolices.pythonanywhere.com/profesores/${rut}/`
                );
                console.log(seccionesProfesor);
  
                seccionesProfesor.forEach((seccion: any) => {
                  const asignatura = seccion.id_asignatura;
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
  
                          // Nueva consulta para obtener los detalles de la clase
                          this.http
                            .get(`https://osolices.pythonanywhere.com/clases/`)
                            .subscribe((clases: any) => {
                              const clasesSeccion = clases.filter(
                                (clase: any) => clase.id_seccion === seccion.id_seccion
                              );
                              clasesSeccion.forEach((clase: any) => {
                                const seccionClase = { ...seccion }; // Crea una copia de la sección
                                seccionClase.horario = clase.horario;
                                seccionClase.dia = clase.dia;
                                console.log('seccion con detalles de la clase:', seccionClase);
  
                                this.secciones.push(seccionClase);
                              });
                            });
                        });
                    }
                  }
                });
              });
          }
        });
    }
  }
  
  
  

  logOut() {
    this.authService.logout(); // Llama al método logout de AuthServiceService aquí
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.getAsignaturasProfesor();
    const userData = window.localStorage.getItem('userData');
    if (userData) {
      this.usuario = JSON.parse(userData);
    }
  }
  updateDay(event: any) {
    this.selectedDay = event.detail.value;
  }
}
