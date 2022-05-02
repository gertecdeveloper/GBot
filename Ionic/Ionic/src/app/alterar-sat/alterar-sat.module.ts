import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlterarSatPageRoutingModule } from './alterar-sat-routing.module';

import { AlterarSatPage } from './alterar-sat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlterarSatPageRoutingModule
  ],
  declarations: [AlterarSatPage]
})
export class AlterarSatPageModule {}
