import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SensorPage } from './sensor.page';

const routes: Routes = [
  {
    path: '',
    component: SensorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SensorPageRoutingModule {}
