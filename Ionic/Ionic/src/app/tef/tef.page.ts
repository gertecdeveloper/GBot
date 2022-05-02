import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertController } from '@ionic/angular';

import * as moment from 'moment'
declare var cordova;

@Component({
  selector: 'app-tef',
  templateUrl: './tef.page.html',
  styleUrls: ['./tef.page.scss'],
})
export class TefPage implements OnInit {
  a112_gbotplugin: any;
  items = [];
  pagamentoValue: string;
  pagamento: string = 'CREDITO';
  parcelamento: string = 'Adm';
  parcelamentoValue: string;
  parcelas: number = 1;
  apiValue: string;
  api: string = 'MSITEF';
  impressao = true;
  valor = '10,00';
  valorTratado = 1000;
  ip: string = '';
  isDisabled: boolean = false;
  isDisabledIp: boolean = false;
  
  regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  boxRetornoTef: string = '';

 

   
  constructor(public alertController: AlertController,private changeRef: ChangeDetectorRef) {
    this.a112_gbotplugin = cordova.plugins.a112_gbotplugin;
  }

  ngOnInit() {}

  formataNumero(e: any, separador: string = ',', decimais: number = 2) {
    let a: any = e.value.split('');
    let ns: string = '';
    a.forEach((c: any) => {
      if (!isNaN(c)) ns = ns + c;
    });
    ns = parseInt(ns).toString();
    if (ns.length < decimais + 1) {
      ns = '0'.repeat(decimais + 1) + ns;
      ns = ns.slice((decimais + 1) * -1);
    }
    let ans = ns.split('');
    let r = '';
    for (let i = 0; i < ans.length; i++)
      if (i == ans.length - decimais) r = r + separador + ans[i];
      else r = r + ans[i];
    if (isNaN(parseInt(r))) r = '0,00';
    e.value = r;
  }

  blurValor(valor: number): void {
    let auxS = valor.toString().replace(',', '');
    this.valorTratado = Number.parseInt(auxS);
    console.log(this.valor, this.valorTratado);
  }

  // sera substituida pela ESCPOS
  async alertImpressaoGPOS(operacao: string) {
    const alert = await this.alertController.create({
      header: 'Realizar impressão',
      message: 'Deseja realizar a impressão pela aplicação?',
      buttons: [
        {
          text: 'NÃO',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'SIM',
          handler: () => {
            this.a112_gbotplugin.dialogImpressaoGPOS(
              {
                operacao: operacao,
              },
              (res) => {
                console.log(res);
              },
              (err) => {
                console.log(err);
              },
            );
          },
        },
      ],
    });

    await alert.present();
  }

 
  
 
 
  async transAprovmSitefAlert() {
    let boxRetornoTefOld = this.boxRetornoTef;
    let now = moment().format("DD-MM-YYYY HH:mm:ss");
    const alert = await this.alertController.create({
      header: 'Ação executada com sucesso',
      message: `  
        CODRESP: ${this.items[0]['CODRESP']}<br/>
        COMP_DADOS_CONF: ${this.items[0]['COMP_DADOS_CONF']}<br/>
        CODTRANS: ${this.items[0]['CODTRANS']}<br/> 
        CODTRANS: ${this.items[0]['CODTRANS']} ${this.items[0]['CODTRANS_NAME']}<br/> 
        VLTROCO: ${this.items[0]['VLTROCO']}<br/> 
        REDE_AUT: ${this.items[0]['REDE_AUT']}<br/> 
        BANDEIRA: ${this.items[0]['BANDEIRA']}<br/> 
        NSU_SITEF: ${this.items[0]['NSU_SITEF']}<br/> 
        NSU_HOST: ${this.items[0]['NSU_HOST']}<br/> 
        COD_AUTORIZACAO: ${this.items[0]['COD_AUTORIZACAO']}<br/> 
        NUM_PARC: ${this.items[0]['NUM_PARC']}<br/> 
        `,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            
          },
        },
      ],
    });
    await alert.present();
    this.boxRetornoTef = now + '\n' + this.items[0]['VIA_CLIENTE'] + '\n' + '\n';
    this.boxRetornoTef += this.items[0]['VIA_ESTABELECIMENTO'] + '\n' ;
    this.boxRetornoTef +=  '-------------------------------------------' + '\n';
    
    this.boxRetornoTef += boxRetornoTefOld;
  }

  transNegadamSitefAlert() {
    let boxRetornoTefOld = this.boxRetornoTef;
    let now = moment().format("DD-MM-YYYY HH:mm:ss");
    this.boxRetornoTef =  now +  '\n' +
      'Ocorreu um erro durante a realização da ação' +'\n' +
      'CODRESP: ' + this.items[0]['CODRESP'] + '\n' +
      '-------------------------------------------' + '\n';
      this.boxRetornoTef += boxRetornoTefOld;
  }

  async alertHeader(msg) {
    const alert = await this.alertController.create({
      header: 'Erro ao executar função',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  pagamentoGroupChange(event) {
    this.pagamentoValue = event.detail['value'];
    switch (this.pagamentoValue) {
      case 'CREDITO':
        this.pagamento = this.pagamentoValue;
        this.isDisabled = false;
        break;
      case 'DEBITO':
        this.pagamento = this.pagamentoValue;
        this.parcelas = 1;
        this.isDisabled = true;
        break;
      case 'TODOS':
        this.pagamento = this.pagamentoValue;
        this.parcelas = 1;
        this.isDisabled = true;
        break;
      case 'CARTEIRADIGITAL':
        this.pagamento = this.pagamentoValue;
        this.parcelas = 1;
        this.isDisabled = true;  
        break;
      default:
        this.pagamento = null;
    }
  }

  parcelamentoGroupChange(event) {
    this.parcelamentoValue = event.detail['value'];
    switch (this.parcelamentoValue) {
      case 'Loja':
        this.parcelamento = this.parcelamentoValue;
        break;
      case 'Adm':
        this.parcelamento = this.parcelamentoValue;
        break;
      default:
        this.parcelamento = null;
    }
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg
      
     
    });
    await alert.present();
  }

  enviarTransacao() {
    if (this.pagamento === '' || this.pagamento === null) {
      this.alertHeader('Escolha um meio de pagamento');
      return;
    }
    if (this.valorTratado === 0 || this.valorTratado === null) {
      this.alertHeader('O valor de venda digitado deve ser maior que 0');
      return;
    }
    if (this.parcelas === null || this.parcelas.toString() === '') {
      this.alertHeader('Informe um número de parcelas válido');
      return;
    }
    if (this.parcelas.toString() === '0' && this.pagamento === 'CREDITO') {
      this.alertHeader(
        'É necessário colocar o número de parcelas desejadas (obs.: Opção de compra por crédito marcada)',
      );
      return;
    }
    if (this.valor.toString() === '0' || isNaN(parseInt(this.valor))) {
      this.alertHeader('O valor de venda digitado deve ser maior que 0');
      return;
    }
    this.items = [];
    if (this.regex.test(this.ip)) {
      this.a112_gbotplugin.executeVenda(
        {
          valor: this.valorTratado,
          ip: this.ip,
          pagamento: this.pagamento,
          parcelas: this.parcelas,
          api: this.api,
          impressao: this.impressao,
          parcelamento: this.parcelamento,
        },
        (res) => {
          console.log(JSON.stringify(res));
          this.items.push(res);
          this.transAprovmSitefAlert();
          //Atualiza a tela da aplicação com as novas informações na caixa de retornoapós o encerramento do m-sitef
          this.changeRef.detectChanges();
        },
        (err) => {
          console.log(JSON.stringify(err));
          this.items.push(err);
          this.transNegadamSitefAlert();
          //Atualiza a tela da aplicação com as novas informações na caixa de retornoapós o encerramento do m-sitef
          this.changeRef.detectChanges();
        },
      );
    }else {
          this.alertHeader('Digite um IP válido');
      }
    
  }

  cancelarTransacao() {
    this.items = [];
    if (this.regex.test(this.ip)) {
      this.items = [];
      this.a112_gbotplugin.executeCancelamento(
        {
          valor: this.valorTratado,
          ip: this.ip,
          pagamento: this.pagamento,
          parcelas: this.parcelas,
          api: this.api,
          impressao: this.impressao,
        },
        (res) => {
          console.log(JSON.stringify(res));
          this.items.push(res);
          this.transAprovmSitefAlert();
          //Atualiza a tela da aplicação com as novas informações na caixa de retornoapós o encerramento do m-sitef
          this.changeRef.detectChanges();
        },
        (err) => {
          console.log(JSON.stringify(err));
          this.items.push(err);
          this.transNegadamSitefAlert();
          //Atualiza a tela da aplicação com as novas informações na caixa de retornoapós o encerramento do m-sitef
          this.changeRef.detectChanges();
        },
      );
      }else {
        this.alertHeader('Digite um IP válido');
      }
  }

    funcoesAlert(){
      let boxRetornoTefOld = this.boxRetornoTef;
      let now = moment().format("DD-MM-YYYY HH:mm:ss");
      if(this.items[0]['VIA_CLIENTE'] != '' && this.items[0]['VIA_CLIENTE'] != null && this.items[0]['VIA_CLIENTE'] != undefined){
       this.boxRetornoTef = now + '\n' + this.items[0]['VIA_CLIENTE'] + 
          '-------------------------------------------' + '\n' + boxRetornoTefOld;
      }
      else{
        this.boxRetornoTef = now + '\n' + '\n' + 
        '-------------------------------------------' + '\n' + boxRetornoTefOld;
      }
    }
  funcoes() {
    this.items = [];
    if (this.regex.test(this.ip)) {
      this.a112_gbotplugin.executeFuncoes(
        {
          valor: this.valorTratado,
          ip: this.ip,
          pagamento: this.pagamento,
          parcelas: this.parcelas,
          api: this.api,
          impressao: this.impressao,
        },
        (res) => {
          console.log(JSON.stringify(res));
            this.items.push(res);
            this.funcoesAlert();
            //Atualiza a tela da aplicação com as novas informações na caixa de retornoapós o encerramento do m-sitef
            this.changeRef.detectChanges();
        },
        (err) => {
          console.log(JSON.stringify(err));
          this.items.push(err);
          this.transNegadamSitefAlert();
          //Atualiza a tela da aplicação com as novas informações na caixa de retornoapós o encerramento do m-sitef
          this.changeRef.detectChanges();
        },
      );
    } else {
        this.alertHeader('Digite um IP válido');
      }
  }


  reImpressaoAlert(res){
    let boxRetornoTefOld = this.boxRetornoTef;
    let now = moment().format("DD-MM-YYYY HH:mm:ss");
    this.boxRetornoTef = now + '\n' + res + '\n' + boxRetornoTefOld;
  }
   
  reimpressao() {
    if (this.api === '' || this.api === null) {
      this.alertHeader('Escolha uma API');
      return;
    }
    this.items = [];
     
      if (this.regex.test(this.ip)) {
        this.a112_gbotplugin.executeReimpressao(
          {
            api: this.api,
            valor: this.valorTratado,
            impressao: this.impressao,
            ip: this.ip,
          },
          (res) => {
            console.log(JSON.stringify(res));
            this.items.push(res);
            this.reImpressaoAlert(res);
            //Atualiza a tela da aplicação com as novas informações na caixa de retornoapós o encerramento do m-sitef
            this.changeRef.detectChanges();
          },
          (err) => {
            console.log(JSON.stringify(err));
            this.items.push(err);
            this.transNegadamSitefAlert();
            //Atualiza a tela da aplicação com as novas informações na caixa de retornoapós o encerramento do m-sitef
            this.changeRef.detectChanges();
          },
        );
      } else {
        this.alertHeader('Digite um IP válido');
      }
    }
  
}
