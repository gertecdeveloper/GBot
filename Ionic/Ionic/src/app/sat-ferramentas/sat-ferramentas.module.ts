import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SatFerramentasPageRoutingModule } from './sat-ferramentas-routing.module';

import { SatFerramentasPage } from './sat-ferramentas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SatFerramentasPageRoutingModule
  ],
  declarations: [SatFerramentasPage]
})
export class SatFerramentasPageModule {}
