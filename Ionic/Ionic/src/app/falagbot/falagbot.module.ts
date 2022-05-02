import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FalagbotPageRoutingModule } from './falagbot-routing.module';

import { FalagbotPage } from './falagbot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FalagbotPageRoutingModule
  ],
  declarations: [FalagbotPage]
})
export class FalagbotPageModule {}
