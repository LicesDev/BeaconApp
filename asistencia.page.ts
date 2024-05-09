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
  
  estudiantes: any[] = [];
  presentes: Alumno[] = [];
  estudiantesPresentes: any =[];
  constructor(private toastController: ToastController, private router: Router, private route: ActivatedRoute, private http: HttpClient) { 

    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      const state = navigation.extras.state as {estudiantes: any[], presentes: Alumno[]};
      this.estudiantes = state.estudiantes;
      this.presentes = state.presentes;
    }
  }
  
  ngAfterViewInit() {
    let element = document.getElementById('navbarToggleExternalContent');
    if (element) {
      let bsCollapse = new bootstrap.Collapse(element, {
        toggle: false
      });
    }
  }

  ngOnInit() {
    
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
compararEstudiantes(){

}
  registrarAsistencia() {
   
  }
}
