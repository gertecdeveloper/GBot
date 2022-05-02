import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sat',
  templateUrl: './sat.page.html',
  styleUrls: ['./sat.page.scss'],
})
export class SatPage implements OnInit {

  constructor(private router: Router) 
  { }

  ngOnInit() {
  }

  ativacaoSat(){
    this.router.navigate(['ativacao-sat']);
  }

  associarSat(){
    this.router.navigate(['associar-sat']);
  }

  testeSat(){
    this.router.navigate(['teste-sat']);
  }

  satConfigRede(){
    this.router.navigate(['sat-config-rede'])
  }
  
  alterarSat(){
    this.router.navigate(['alterar-sat'])
  }

  satFerramentas(){
    this.router.navigate(['sat-ferramentas']);
  }
}
