import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GlobalService } from '../global.service';
declare var cordova;

@Component({
  selector: 'app-sat-ferramentas',
  templateUrl: './sat-ferramentas.page.html',
  styleUrls: ['./sat-ferramentas.page.scss'],
})
export class SatFerramentasPage implements OnInit {
  a112_gbotplugin: any;
  codigoAtivacao: string = "";
  callback = [];
  codAtv: string = "";

  constructor(public alertController: AlertController, public global: GlobalService) 
  {
    this.a112_gbotplugin = cordova.plugins.a112_gbotplugin;
    this.codigoAtivacao = this.global.getCodAtv();
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

  desbloquearSat() {
    this.callback = [];
    this.a112_gbotplugin.funcoesSat(
      {
        "funcao": "DesbloquearSat",
        "codigoAtivacao": this.codigoAtivacao,
        "random": Math.floor(100000 + Math.random() * 900000)
      },
      res => {
        console.log(JSON.stringify(res))
        this.global.setCodAtv(this.codigoAtivacao);
        this.callback.push(res);
        if(this.callback[0]['codigoEEEEE'] === "")
          this.alert("Mensagem: " + this.callback[0]['respostaRecebida']);
        else {
          this.alert(`
            EEEEE: ${this.callback[0]['codigoEEEEE']}<br/><br/>
            Mensagem: ${this.callback[0]['respostaRecebida']}<br/><br/>
          `);
        }
      },
      err => {
        console.log(err)
        this.alert(err);
      }
    )
  }

  bloquearSat() {
    this.callback = [];
    this.a112_gbotplugin.funcoesSat(
      {
        "funcao": "BloquearSat",
        "codigoAtivacao": this.codigoAtivacao,
        "random": Math.floor(100000 + Math.random() * 900000)
      },
      res => {
        console.log(JSON.stringify(res))
        this.global.setCodAtv(this.codigoAtivacao);
        this.callback.push(res);
        if(this.callback[0]['codigoEEEEE'] === "")
          this.alert("Mensagem: " + this.callback[0]['respostaRecebida']);
          else {
            this.alert(`
              EEEEE: ${this.callback[0]['codigoEEEEE']}<br/><br/>
              Mensagem: ${this.callback[0]['respostaRecebida']}<br/><br/>
            `);
          }
      },
      err => {
        console.log(err)
        this.alert(err);
      }
    )
  }

  extrairLog() {
    this.callback = [];
    this.a112_gbotplugin.funcoesSat(
      {
        "funcao": "ExtrairLog",
        "codigoAtivacao": this.codigoAtivacao,
        "random": Math.floor(100000 + Math.random() * 900000)
      },
      res => {
        console.log(JSON.stringify(res))
        this.global.setCodAtv(this.codigoAtivacao);
        this.callback.push(res);
        this.alert(this.callback[0]['codigoEEEEE'] +'\n' + this.callback[0]['respostaRecebida'] );
      },
      err => {
        console.log(err)
        this.alert(err);
      }
    )
  }

  atualizarSoftware() {
    this.callback = [];
    this.a112_gbotplugin.funcoesSat(
      {
        "funcao": "AtualizarSoftware",
        "codigoAtivacao": this.codigoAtivacao,
        "random": Math.floor(100000 + Math.random() * 900000)
      },
      res => {
        console.log(JSON.stringify(res))
        this.global.setCodAtv(this.codigoAtivacao);
        this.callback.push(res);
        if(this.callback[0]['codigoEEEEE'] === "")
          this.alert("Mensagem: " + this.callback[0]['respostaRecebida']);
          else {
            this.alert(`
              EEEEE: ${this.callback[0]['codigoEEEEE']}<br/><br/>
              Mensagem: ${this.callback[0]['respostaRecebida']}<br/><br/>
            `);
          }
      },
      err => {
        console.log(err)
        this.alert(err);
      }
    )
  }

  verificarVersao() {
    this.callback = [];
    this.a112_gbotplugin.funcoesSat(
      {
        "funcao": "Versao"
      },
      res => {
        console.log(JSON.stringify(res))
        this.callback.push(res);
        this.alert(this.callback[0]['respostaRecebida']);
      },
      err => {
        console.log(err)
        this.alert(err);
      }
    )
  }
}
