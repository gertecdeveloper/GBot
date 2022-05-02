import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigobarrasPageRoutingModule } from './codigobarras-routing.module';

import { CodigobarrasPage } from './codigobarras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigobarrasPageRoutingModule
  ],
  declarations: [CodigobarrasPage]
})
export class CodigobarrasPageModule {}
