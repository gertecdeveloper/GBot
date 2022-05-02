import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SatConfigRedePageRoutingModule } from './sat-config-rede-routing.module';

import { SatConfigRedePage } from './sat-config-rede.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SatConfigRedePageRoutingModule
  ],
  declarations: [SatConfigRedePage]
})
export class SatConfigRedePageModule {}
