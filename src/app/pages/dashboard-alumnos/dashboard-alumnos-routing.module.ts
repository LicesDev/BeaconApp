import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardAlumnosPage } from './dashboard-alumnos.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardAlumnosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardAlumnosPageRoutingModule {}
