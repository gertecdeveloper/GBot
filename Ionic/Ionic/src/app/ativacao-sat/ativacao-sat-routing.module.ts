import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtivacaoSatPage } from './ativacao-sat.page';

const routes: Routes = [
  {
    path: '',
    component: AtivacaoSatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtivacaoSatPageRoutingModule {}
