import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GlobalService } from '../global.service';
declare var cordova;

@Component({
  selector: 'app-alterar-sat',
  templateUrl: './alterar-sat.page.html',
  styleUrls: ['./alterar-sat.page.scss'],
})
export class AlterarSatPage implements OnInit {
  a112_gbotplugin: any;
  opcoes:string;
  atual:string = "";
  novo:string = "";
  confirmar:string = "";
  categoriaOpcao:string = "Código de ativação";
  categoriaValue:string;
  callback = [];
  
  constructor (public alertController: AlertController, public global: GlobalService) 
  { 
    this.a112_gbotplugin = cordova.plugins.a112_gbotplugin;
    this.atual = this.global.getCodAtv();
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

  optionsCodigo(event) {
    this.categoriaValue = event.detail['value'];
    switch (this.categoriaValue) {
      case 'Código de ativação':
        this.categoriaOpcao = this.categoriaValue;
        break;
      case 'Código de Emergência':
        this.categoriaOpcao = this.categoriaValue;
        break;
      default:
        this.categoriaOpcao = "Código de ativação";
    }
  }

  alterarCodigo() {
    this.callback = [];
    this.a112_gbotplugin.funcoesSat(
      {
        "funcao": "TrocarCodAtivacao",
        "codigoAtual": this.atual,
        "codigoNovo": this.novo,
        "codigoConfirmar": this.confirmar,
        "opcaoCodigo": this.categoriaOpcao,
        "random": Math.floor(100000 + Math.random() * 900000)
      },
      res => {
        console.log(JSON.stringify(res))
        this.global.setCodAtv(this.novo);
        this.callback.push(res);
        this.alert(this.callback[0]['respostaRecebida']);
      },
      err => {
        console.log(err)
        this.alert(err);
      }
    );
  }
}
