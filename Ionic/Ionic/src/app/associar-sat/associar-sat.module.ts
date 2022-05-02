import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssociarSatPageRoutingModule } from './associar-sat-routing.module';

import { AssociarSatPage } from './associar-sat.page';
import { BrMaskerModule } from 'br-mask';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssociarSatPageRoutingModule,
    BrMaskerModule
  ],
  declarations: [AssociarSatPage]
})
export class AssociarSatPageModule {}
