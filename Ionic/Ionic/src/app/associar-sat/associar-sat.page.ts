import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GlobalService } from '../global.service';
declare var cordova;

@Component({
  selector: 'app-associar-sat',
  templateUrl: './associar-sat.page.html',
  styleUrls: ['./associar-sat.page.scss'],
})
export class AssociarSatPage implements OnInit {
  a112_gbotplugin: any;
  cnpj:string = "03.654.119/0001-76";
  cnpjHouse:string = "16.716.114/0001-72";
  codigoAtivar:string = "";
  assinatura:string = "SGR-SAT SISTEMA DE GESTAO E RETAGUARDA DO SAT";
  callback = [];

  constructor(public alertController: AlertController, public global: GlobalService) 
  {
    this.a112_gbotplugin = cordova.plugins.a112_gbotplugin;
    this.codigoAtivar = this.global.getCodAtv();
  }

  ngOnInit() {
  }

  async alert(msg) {
    const alert = await this.alertController.create({
      header: "Retorno",
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  ativarSat() {
    this.callback = [];
    this.a112_gbotplugin.funcoesSat(
      {
        "funcao": "AssociarSAT",
        "codigoAtivacao": this.codigoAtivar,
        "cnpj": this.cnpj,
        "cnpjSW": this.cnpjHouse,
        "assinatura": this.assinatura,
        "random": Math.floor(100000 + Math.random() * 900000)
      },
      res => {
        console.log(JSON.stringify(res));
        this.global.setCodAtv(this.codigoAtivar);
        this.callback.push(res);
        this.alert(this.callback[0]['codigoResposta'] + " - " + this.callback[0]['respostaRecebida']);
      },
      err => {
        console.log(err);
        this.alert(err);
      }
    );
  }
}
