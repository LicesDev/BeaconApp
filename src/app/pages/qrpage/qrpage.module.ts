import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrpagePageRoutingModule } from './qrpage-routing.module';

import { QrpagePage } from './qrpage.page';

import { MapComponent } from '../../componentes/map/map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrpagePageRoutingModule
  ],
  declarations: [QrpagePage, MapComponent,]
})
export class QrpagePageModule {}
