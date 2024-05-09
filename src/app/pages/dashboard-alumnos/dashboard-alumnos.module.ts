import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardAlumnosPageRoutingModule } from './dashboard-alumnos-routing.module';

import { DashboardAlumnosPage } from './dashboard-alumnos.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardAlumnosPageRoutingModule,
  ],
  declarations: [DashboardAlumnosPage]
})
export class DashboardAlumnosPageModule {}
