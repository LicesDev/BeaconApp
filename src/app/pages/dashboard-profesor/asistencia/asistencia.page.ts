import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Alumno {
  rut: string;
  nombre: string;
  apellido: string;
}
@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  
 
  fecha: string='';
  id_clase: number=0;
  estudiantes: any[] = [];
  presentes: Alumno[] = [];
  estudiantesPresentes: any =[];
  constructor(private toastController: ToastController, private router: Router, private route: ActivatedRoute, private http: HttpClient) { }
  
  ngAfterViewInit() {
    let element = document.getElementById('navbarToggleExternalContent');
    if (element) {
      let bsCollapse = new bootstrap.Collapse(element, {
        toggle: false
      });
    }
  }

  ngOnInit() {
    
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      const state = navigation.extras.state as {estudiantes: any[], presentes: Alumno[]};
      this.estudiantes = state.estudiantes;
      this.presentes = state.presentes;
    }
    console.log('Estudiantes:', this.estudiantes);
    console.log('Presentes:', this.presentes);
    this.compararEstudiantes();
    this.route.params.subscribe((params) => {
      console.log(params); // Imprime todos los parámetros de la ruta
      this.fecha = params['fecha'];
      this.id_clase = params['id_clase'];
      console.log(this.id_clase)
    });
    
  }

  logOut() {
    this.router.navigate(['/login']);
  }

  
  async alerta() {
    const toast = await this.toastController.create({
      message: 'Asistencia registrada',
      duration: 2000
    });
    toast.present();
  
    // Redirige al usuario después de que la alerta Toast se haya cerrado
    toast.onDidDismiss().then(() => {
      this.router.navigate(['/dashboard-profesor']);
    });
  }

  async compararEstudiantes() {
    this.estudiantesPresentes = await Promise.all(this.estudiantes.map(async estudiante => {
      let estado = 'Ausente';
      for (let presente of this.presentes) {
        if (estudiante.rut_alumno === presente.rut) {
          estado = 'Presente';
          break;
        }
      }
  
      // Obtén el nombre y apellido del estudiante de la API
      let nombre = '';
      let apellido = '';
      await this.http.get(`https://osolices.pythonanywhere.com/alumnos/${estudiante.rut_alumno}`)
        .toPromise()
        .then((data: any) => {
          nombre = data.nombre;
          apellido = data.apellido;
        })
        .catch(error => console.error(error));
  
      return {
        rut_alumno: estudiante.rut_alumno,
        nombre: nombre,
        apellido: apellido,
        estado: estado
      };
    }));
    console.log(this.estudiantesPresentes);
  }
  
  handleStateChange(e: any, estado: string) {
    e.estado = estado;
    console.log(this.estudiantesPresentes);
  }
  
  async registrarAsistencia() {
    for (let estudiante of this.estudiantesPresentes) {
      // Obtén todas las asistencias que corresponden a esta id_clase
      let asistencias: any[] = [];
      await this.http.get(`https://osolices.pythonanywhere.com/asistencias/`)
        .toPromise()
        .then((data: any) => {
          asistencias = data;
        })
        .catch(error => console.error(error));
  
      // Filtra las asistencias para obtener solo las que corresponden a esta id_clase
      let asistenciasClase = asistencias.filter(asistencia => asistencia.id_clase === `https://osolices.pythonanywhere.com/clases/${this.id_clase}/`);
  
      // Comprueba si el estudiante ya existe en la tabla asistencia
      let existe = false;
      for (let asistencia of asistenciasClase) {
        if (asistencia.rut_alumno === `https://osolices.pythonanywhere.com/alumnos/${estudiante.rut_alumno}/`) {
          existe = true;
          break;
        }
      }
  
      // Si el estudiante no existe en la tabla asistencia, realiza el método POST
      if (!existe) {
        const body = {
          rut_alumno: `https://osolices.pythonanywhere.com/alumnos/${estudiante.rut_alumno}/`,
          id_clase: `https://osolices.pythonanywhere.com/clases/${this.id_clase}/`,
          fecha: new Date().toISOString().split('T')[0], // Asegúrate de que la fecha esté en el formato correcto
          estado: estudiante.estado
        };
  
        this.http
          .post('https://osolices.pythonanywhere.com/asistencias/', body)
          .subscribe(response => {
            console.log(response);
            this.alerta();
            this.actualizarClase(this.id_clase);
          }, error => {
            console.error(error);
          });
      }
    }
  }
  
  actualizarClase(id_clase: number){
    const body = {
      estado: true
    };
  
    this.http
      .put(`https://osolices.pythonanywhere.com/clases/${id_clase}/`, body)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.error(error);
      });
  }
  
}
