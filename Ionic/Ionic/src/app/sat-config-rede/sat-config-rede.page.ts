import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GlobalService } from '../global.service';
declare var cordova;

@Component({
  selector: 'app-sat-config-rede',
  templateUrl: './sat-config-rede.page.html',
  styleUrls: ['./sat-config-rede.page.scss'],
})
export class SatConfigRedePage implements OnInit {
  a112_gbotplugin: any;
  codigoAtivacao: string = '';
  tipoRede: string = 'Estático';
  tipoRedeValue: string;
  tipoRedeBool: boolean = true;
  ipSat: string = '';
  mascara: string = '';
  gateway: string = '';
  dns: string = 'Não';
  dns1: string = '';
  dns2: string = '';
  dnsValue: string;
  dnsBool: boolean = false;
  proxy: string = 'Não usa proxy';
  proxyValue: string;
  proxyBool: boolean = false;
  proxyIp: string = '';
  porta: string = '';
  user: string = '';
  password: string = '';
  callback = [];

  constructor(
    public alertController: AlertController,
    public global: GlobalService,
  ) {
    this.a112_gbotplugin = cordova.plugins.a112_gbotplugin;
    this.codigoAtivacao = this.global.getCodAtv();
  }

  ngOnInit() {}

  async alert(msg) {
    const alert = await this.alertController.create({
      header: 'Retorno',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  optionsRede(event) {
    this.tipoRedeValue = event.detail['value'];
    switch (this.tipoRedeValue) {
      case 'Estático':
        this.tipoRede = this.tipoRedeValue;
        this.tipoRedeBool = true;
        break;
      case 'DHCP':
        this.tipoRede = this.tipoRedeValue;
        this.tipoRedeBool = false;
        break;
      default:
        this.tipoRede = '';
    }
  }

  optionsDns(event) {
    this.dnsValue = event.detail['value'];
    switch (this.dnsValue) {
      case 'Não':
        this.dns = this.dnsValue;
        this.dnsBool = false;
        break;
      case 'Sim':
        this.dns = this.dnsValue;
        this.dnsBool = true;
        break;
      default:
        this.dns = '';
    }
  }

  optionsProxy(event) {
    this.proxyValue = event.detail['value'];
    switch (this.proxyValue) {
      case 'Não usa proxy':
        this.proxy = this.proxyValue;
        this.proxyBool = false;
        break;
      case 'Proxy com configuração':
        this.proxy = this.proxyValue;
        this.proxyBool = true;
        break;
      case 'Proxy transparente':
        this.proxy = this.proxyValue;
        this.proxyBool = true;
        break;
      default:
        this.proxy = '';
    }
  }

  configurarRede() {
    this.callback = [];
    if (this.codigoAtivacao.length >= 8 && this.codigoAtivacao.length <= 32) {
      this.a112_gbotplugin.funcoesSat(
        {
          funcao: 'EnviarConfRede',
          codigoAtivacao: this.codigoAtivacao,
          tipoRede: this.tipoRede,
          ipSat: this.ipSat,
          mascara: this.mascara,
          gateway: this.gateway,
          dns1: this.dns1,
          dns2: this.dns2,
          dns: this.dns,
          proxy: this.proxy,
          proxyIp: this.proxyIp,
          porta: this.porta,
          user: this.user,
          password: this.password,
          random: Math.floor(100000 + Math.random() * 900000),
        },
        (res) => {
          console.log(JSON.stringify(res));
          this.global.setCodAtv(this.codigoAtivacao);
          this.callback.push(res);
          this.alert(this.callback[0]['respostaRecebida']);
        },
        (err) => {
          console.log(err);
          this.alert(err);
        },
      );
    } else this.alert('Código de Ativação deve ter entre 8 a 32 caracteres!');
  }
}
