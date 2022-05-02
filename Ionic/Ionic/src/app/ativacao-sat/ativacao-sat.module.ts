import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtivacaoSatPageRoutingModule } from './ativacao-sat-routing.module';

import { AtivacaoSatPage } from './ativacao-sat.page';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtivacaoSatPageRoutingModule,
    BrMaskerModule
  ],
  declarations: [AtivacaoSatPage]
})
export class AtivacaoSatPageModule {}
