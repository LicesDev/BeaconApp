import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardProfesorPageRoutingModule } from './dashboard-profesor-routing.module';

import { DashboardProfesorPage } from './dashboard-profesor.page';
import { Component } from 'ionicons/dist/types/stencil-public-runtime';
import { NavbarComponent } from 'src/app/componentes/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardProfesorPageRoutingModule
  ],
  declarations: [DashboardProfesorPage,NavbarComponent]
})
export class DashboardProfesorPageModule {}
