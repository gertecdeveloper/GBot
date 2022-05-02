import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlterarSatPage } from './alterar-sat.page';

const routes: Routes = [
  {
    path: '',
    component: AlterarSatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlterarSatPageRoutingModule {}
