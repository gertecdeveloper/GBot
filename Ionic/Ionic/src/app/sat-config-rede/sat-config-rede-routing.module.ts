import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SatConfigRedePage } from './sat-config-rede.page';

const routes: Routes = [
  {
    path: '',
    component: SatConfigRedePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SatConfigRedePageRoutingModule {}
