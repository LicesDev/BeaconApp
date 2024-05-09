import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { AlertController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './../../../auth-service.service';

@Component({
  selector: 'app-detalleramo',
  templateUrl: './detalleramo.page.html',
  styleUrls: ['./detalleramo.page.scss'],
})
export class DetalleramoPage implements OnInit {
  secciones: any[] = [];
  descripcion: string = '';
  nombre: string = '';
  horario: string = '';
  selectedRow: any = { estado: false };
  fecha2: string = '';
  id_seccion: number = 0;
  nro_clase:number =0;
  id_clase: number =0;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private http: HttpClient,
    private authService: AuthServiceService,
    private cd: ChangeDetectorRef
  ) {} // Inyecta el ChangeDetectorRef en el constructor

  logOut() {
    this.authService.logout(); // Llama al método logout de AuthServiceService aquí
    this.router.navigate(['/login']);
  }

  IrAqr() {
    this.router.navigate(['dashboard-profesor/qr']);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params); // Imprime todos los parámetros de la ruta
      this.descripcion = params['descripcion'];
      this.nombre = params['nombre'];
      this.horario = params['horario'];
      this.fecha2 = this.getCurrentDate();
      this.id_seccion = params['id_seccion'];
      this.getClasessProfesor(this.id_seccion);

    });
  }
  selectRow(seccion: any) {
    this.selectedRow = seccion;
    console.log(seccion); // Aquí puedes manejar la fila seleccionada
  }
  ngAfterViewInit() {
    let element = document.getElementById('navbarToggleExternalContent');
    if (element) {
      let bsCollapse = new bootstrap.Collapse(element, {
        toggle: false,
      });
    }
  }
  async generarReporte() {
    const alert = await this.alertController.create({
      header: 'Descargar Reporte',
      inputs: [
        // Aquí puedes agregar los campos de tu formulario
      ],
      buttons: [
        {
          text: 'Descargar',
          handler: () => {
            this.descargarReporte();
          },
        },
      ],
    });

    await alert.present();
  }

  async descargarReporte() {
    const toast = await this.toastController.create({
      message: 'Reporte descargado',
      duration: 2000,
    });
    toast.present();
  }

  getCurrentDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  }

  getClasessProfesor(id_seccion: number) {
    const userData = window.localStorage.getItem('userData');

    if (userData) {
      console.log(id_seccion);
      this.http
        .get(`https://osolices.pythonanywhere.com/clases/`)
        .subscribe((dataClases: any) => {
          console.log(dataClases);
          if (dataClases) {
            const secciones: any[] = [];
            dataClases.forEach((clase: any) => {
              if (Number(clase.id_seccion) === Number(id_seccion)) {
                secciones.push(clase);
              }
            });
            // Ordena las secciones por la propiedad fecha
            secciones.sort(
              (a, b) =>
                new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
            );
            console.log(secciones);
            this.secciones = secciones; // Asigna el array secciones a la propiedad secciones de la clase
            this.cd.detectChanges(); // Llama al método detectChanges() para actualizar la vista
          }
        });
    }
  }
}
