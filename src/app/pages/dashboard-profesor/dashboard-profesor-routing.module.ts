import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardProfesorPage } from './dashboard-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardProfesorPage
  },
  
  {
    path: 'qr/:descripcion/:nombre/:nro_clase/:fecha/:descripcion/:id_seccion/:id_clase',
    loadChildren: () => import('./qr/qr.module').then( m => m.QrPageModule)
  },
  {
    path: 'detalleramo/:descripcion/:nombre/:horario/:id_seccion',
    loadChildren: () => import('./detalleramo/detalleramo.module').then( m => m.DetalleramoPageModule)
  },
  {
    path: 'asistencia/:id_clase/:fecha',
    loadChildren: () => import('./asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardProfesorPageRoutingModule {}
