import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SatFerramentasPage } from './sat-ferramentas.page';

const routes: Routes = [
  {
    path: '',
    component: SatFerramentasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SatFerramentasPageRoutingModule {}
