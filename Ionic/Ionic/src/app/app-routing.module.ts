import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'codigobarras',
    loadChildren: () => import('./codigobarras/codigobarras.module').then( m => m.CodigobarrasPageModule)
  },
  {
    path: 'falagbot',
    loadChildren: () => import('./falagbot/falagbot.module').then( m => m.FalagbotPageModule)
  },
  {
    path: 'nfc',
    loadChildren: () => import('./nfc/nfc.module').then( m => m.NfcPageModule)
  },
  {
    path: 'tef',
    loadChildren: () => import('./tef/tef.module').then( m => m.TefPageModule)
  },
  {
    path: 'sat',
    loadChildren: () => import('./sat/sat.module').then( m => m.SatPageModule)
  },
  {
    path: 'ativacao-sat',
    loadChildren: () => import('./ativacao-sat/ativacao-sat.module').then( m => m.AtivacaoSatPageModule)
  },
  {
    path: 'associar-sat',
    loadChildren: () => import('./associar-sat/associar-sat.module').then( m => m.AssociarSatPageModule)
  },
  {
    path: 'teste-sat',
    loadChildren: () => import('./teste-sat/teste-sat.module').then( m => m.TesteSatPageModule)
  },
  {
    path: 'sat-config-rede',
    loadChildren: () => import('./sat-config-rede/sat-config-rede.module').then( m => m.SatConfigRedePageModule)
  },
  {
    path: 'alterar-sat',
    loadChildren: () => import('./alterar-sat/alterar-sat.module').then( m => m.AlterarSatPageModule)
  },
  {
    path: 'sat-ferramentas',
    loadChildren: () => import('./sat-ferramentas/sat-ferramentas.module').then( m => m.SatFerramentasPageModule)
  },
  {
    path: 'sensor',
    loadChildren: () => import('./sensor/sensor.module').then( m => m.SensorPageModule)
  },
  
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
