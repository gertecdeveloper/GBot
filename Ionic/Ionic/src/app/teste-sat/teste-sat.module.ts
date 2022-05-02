import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TesteSatPageRoutingModule } from './teste-sat-routing.module';

import { TesteSatPage } from './teste-sat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TesteSatPageRoutingModule
  ],
  declarations: [TesteSatPage]
})
export class TesteSatPageModule {}
