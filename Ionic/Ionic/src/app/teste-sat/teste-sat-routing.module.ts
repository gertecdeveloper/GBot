import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TesteSatPage } from './teste-sat.page';

const routes: Routes = [
  {
    path: '',
    component: TesteSatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TesteSatPageRoutingModule {}
