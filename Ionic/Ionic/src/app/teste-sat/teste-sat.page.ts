import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment'
import { resolve } from 'url';
import { GlobalService } from '../global.service';
declare var cordova;

@Component({
  selector: 'app-teste-sat',
  templateUrl: './teste-sat.page.html',
  styleUrls: ['./teste-sat.page.scss'],
})
export class TesteSatPage implements OnInit {
  a112_gbotplugin: any;
  items = [];
  codigoAtv: string = "";
  numSessao: string = "";
  boxRetornoSat: string = "";
  numSessaoValue: number;
  xmlVenda: string = "../../assets/xmlSat/arq_venda_008_Simples_Nacional.xml";
  xmlCancelamento: string = "../../assets/xmlSat/arq_cancelamento.xml";
  chaveCancelamento: string = "CFe29200603654119000176599000073560000266137373";
  xml1: any = [];
  xml2: any = [];
  xmlCancelBase64: string ="";
  xmlVendaBase64:string ="";
  
  constructor(public alertController: AlertController, public global: GlobalService,private changeRef: ChangeDetectorRef) 
  {
    this.a112_gbotplugin = cordova.plugins.a112_gbotplugin;
    this.codigoAtv = this.global.getCodAtv();
  }
  
  async ngOnInit() {
    this.xml1.push(await this.transformaXml(this.xmlVenda));
    this.xml2.push(await this.transformaXml(this.xmlCancelamento));
    this.xmlVendaBase64 = this.xml1[0]['srcElement']['result'];
    this.xmlVendaBase64 = this.xmlVendaBase64.split(",")[1];
    this.xmlCancelBase64 = this.xml2[0]['srcElement']['result'];
    this.xmlCancelBase64 = this.xmlCancelBase64.split(",")[1];
  }

  consultarStatusRetorno(resultado:string) {
    let boxRetornoSatOld = this.boxRetornoSat;
    let now = moment().format("DD-MM-YYYY HH:mm:ss");
    if(resultado == "sucesso"){
      this.boxRetornoSat = now + '\n' +
        'Número Sessão: ' + this.items[0]['numeroSessao'] + '\n' +
        'EEEE: ' + this.items[0]['codigoEEEE'] + '\n' +
        'Mensagem: ' + this.items[0]['respostaRecebida'] + '\n' +
        '------- Conteúdo Retorno -------' + '\n' +
        'Número de Série do SAT: ' + this.items[0]['numeroSerieSat'] + '\n' +
        'Tipo de Lan: ' + this.items[0]['tipoLan'] + '\n' +
        'IP SAT: ' + this.items[0]['ipSat'] + '\n' +
        'MAC SAT: ' + this.items[0]['macSat'] + '\n' +
        'Máscara: ' + this.items[0]['mascara'] + '\n' +
        'Gateway: ' + this.items[0]['gateway'] + '\n' +
        'DNS 1: ' + this.items[0]['dns1'] + '\n' +
        'DNS 2: ' + this.items[0]['dns2'] + '\n' +
        'Status da Rede: ' + this.items[0]['statusRede'] + '\n' +
        'Nível da Bateria: ' + this.items[0]['nivelBateria'] + '\n' +
        'Memória de Trabalho Total: ' + this.items[0]['memoriaDeTrabalhoTotal'] + '\n' +
        'Memória de Trabalho Usada: ' + this.items[0]['memoriaDeTrabalhoUsada'] + '\n' +
        'Data/Hora: ' + this.items[0]['dataHora'] + '\n' +
        'Versão: ' + this.items[0]['versao'] + '\n' +
        'Versão de Leiaute: ' +  this.items[0]['versaoLeiaute'] + '\n' +
        'Último CFe-Sat Emitido: ' + this.items[0]['ultimoCfeEmitido'] + '\n' +
        'Primeiro CFe-Sat Em Memória: ' + this.items[0]['primeiroCfeMemoria']+ '\n' +
        'Último CFe-Sat Em Memória: ' + this.items[0]['ultimoCfeMemoria'] + '\n' +
        'Última Transmissão de CFe-SAT para SEFAZ: ' + this.items[0]['ultimaTransmissaoSefazDataHora'] + '\n' +
        'Última Comunicacao com a SEFAZ: ' + this.items[0]['ultimaComunicacaoSefazData'] + '\n' +
        'Estado de Operação do SAT: ' + this.items[0]['estadoDeOperacao'] +  '\n' +
        'Data da Emissão do Certificado: '  + this.items[0]['dataEmissaoCertificado'] + '\n' +
        'Data de Vencimento do Certificado: ' + this.items[0]['dataVencimentoCertificado'] + '\n';
    }else{
      this.boxRetornoSat = now + '\n' + 'Mensagem: ' + this.items[0]['respostaRecebida'] + '\n';
    }
    
    this.boxRetornoSat += '----------------------------------' + '\n' + boxRetornoSatOld;
    //Atualiza a tela da aplicação com as novas informações na caixa de retorno
    this.changeRef.detectChanges();
  }

  async alertSatPopUp(msg) {
    const alert = await this.alertController.create({
      header: "Retorno",
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  alertSat(msg) {
    let boxRetornoSatOld = this.boxRetornoSat;
    let now = moment().format("DD-MM-YYYY HH:mm:ss");
    this.boxRetornoSat = now + '\n' + msg + '\n';
    this.boxRetornoSat += '----------------------------------' + '\n' + boxRetornoSatOld;
    //Atualiza a tela da aplicação com as novas informações na caixa de retorno
    this.changeRef.detectChanges();
  }
  transformaXml(assetPath) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", assetPath, true);
      xhr.responseType = "blob";
      xhr.onload = function (e) {
          let file = this.response;
          let reader = new FileReader();
          reader.onload = function(event) {
              resolve(event);
          }
          reader.readAsDataURL(file);
      };

      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        }
      };
      xhr.send();
    });
  }

  consultarSat() {
    this.items = [];
      this.a112_gbotplugin.funcoesSat(
        {
          "funcao": "ConsultarSat",
          "random": Math.floor(100000 + Math.random() * 900000)
        },
        res => { 
          console.log(JSON.stringify(res))
          this.items.push(res);
          let boxRetornoSatOld = this.boxRetornoSat;
          let now = moment().format("DD-MM-YYYY HH:mm:ss");
          this.boxRetornoSat = now + '\n' + this.items[0]['codigoResposta'] + " - " + this.items[0]['respostaRecebida'] + '\n';
          this.boxRetornoSat += '----------------------------------' + '\n' + boxRetornoSatOld;
          //Atualiza a tela da aplicação com as novas informações na caixa de retorno
          this.changeRef.detectChanges();
          //this.alertSat(this.items[0]['codigoResposta'] + " - " + this.items[0]['respostaRecebida']);
        },
        err => { 
          console.log(err)
          this.alertSat(err);
          //Atualiza a tela da aplicação com as novas informações na caixa de retorno
          this.changeRef.detectChanges();
        }
      );
  }

  status() {
    this.items = [];
    if(this.codigoAtv.length >= 8 && this.codigoAtv.length <= 32) 
      this.a112_gbotplugin.funcoesSat(
        {
          "funcao": "ConsultarStatusOperacional",
          "codigoAtivacao": this.codigoAtv,
          "random": Math.floor(100000 + Math.random() * 900000)
        },
        res => { 
          this.global.setCodAtv(this.codigoAtv);
          this.items.push(res);
          this.consultarStatusRetorno("sucesso");
        },
        err => {
          this.items.push(err);
          this.consultarStatusRetorno("erro");
        }
      );
    else
      this.alertSatPopUp("Código de Ativação deve ter entre 8 a 32 caracteres!");
  }

  testeFim() {
    this.items = [];
    if(this.codigoAtv.length >= 8 && this.codigoAtv.length <= 32) {
      this.a112_gbotplugin.funcoesSat(
        {
          "funcao": "EnviarTesteFim",
          "codigoAtivacao": this.codigoAtv,
          "xmlVenda": this.xmlVendaBase64,
          "random": Math.floor(100000 + Math.random() * 900000)
        },
        res => {
          this.items.push(res);
          this.global.setCodAtv(this.codigoAtv);
          if(this.items[0]['base64Codigo'] === "" || !this.items[0]['base64Codigo']) {
            this.alertSat("Mensagem: " + this.items[0]['respostaRecebida']);
            console.log(this.items[0]['respostaRecebida']);
          } else {
            console.log(this.items[0]['respostaRecebida']);
            let decodedXmlSefaz = atob(this.items[0]['base64Codigo']);
            let boxRetornoSatOld = this.boxRetornoSat;
            let now = moment().format("DD-MM-YYYY HH:mm:ss");
            this.boxRetornoSat = 'Número da Sessão: ' + this.items[0]['numeroSessao'] + '\n' +
              'EEEEE: ' + this.items[0]['codigoEEEEE'] + '\n' +
              'Mensagem: ' + this.items[0]['respostaRecebida'] + '\n' + 
              'Timestamp: '+ this.items[0]['timeStamp'] + '\n' + 
              'Número Doc Fiscal: '+ this.items[0]['numeroDocFisca'] + '\n' + 
              'Chave de Consulta (Cfe): ' + this.items[0]['chaveConsulta'] + '\n' +
              'Arquivo Base 64 (Convertido para String): '+ this.escapeHtml(decodedXmlSefaz) +'\n';
              this.boxRetornoSat += '----------------------------------' + '\n' + boxRetornoSatOld;
              //Atualiza a tela da aplicação com as novas informações na caixa de retorno
              this.changeRef.detectChanges();
          }
        },
        err => { 
          console.log(err)
          this.alertSat(err);
        }
      );
    } else {
      this.alertSatPopUp("Código de Ativação deve ter entre 8 a 32 caracteres!");
    }
  }

  escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

  enviarDados() {
    this.items = [];
    if(this.codigoAtv.length >= 8 && this.codigoAtv.length <= 32) 
      this.a112_gbotplugin.funcoesSat(
        {
          "funcao": "EnviarTesteVendas",
          "codigoAtivacao": this.codigoAtv,
          "xmlVenda": this.xmlVendaBase64,
          "random": Math.floor(100000 + Math.random() * 900000)
        },
        res => {
          this.items.push(res);
          this.global.setCodAtv(this.codigoAtv);
          if(this.items[0]['base64Codigo'] === "")
            this.alertSat("Mensagem: " + this.items[0]['respostaRecebida']);
          else {
            let decodedXmlSefaz = atob(this.items[0]['base64Codigo']);
            this.chaveCancelamento = this.items[0]['chaveConsulta'];
            let boxRetornoSatOld = this.boxRetornoSat;
            let now = moment().format("DD-MM-YYYY HH:mm:ss");
            this.boxRetornoSat = now + '\n' + 'Número da Sessão: ' + this.items[0]['numeroSessao'] + '\n' +
              'EEEEE: ' + this.items[0]['codigoEEEEE'] + '\n' +
              'Mensagem: ' + this.items[0]['respostaRecebida'] + '\n' + 
              'Timestamp: '+ this.items[0]['timeStamp'] + '\n' + 
              'Chave de Consulta (Cfe): ' + this.items[0]['chaveConsulta'] + '\n' +
              'Valor Total Cfe:' + this.items[0]['valorTotalCfe'] + '\n' +
              'Arquivo Base 64 (Convertido para String): '+ this.escapeHtml(decodedXmlSefaz) +'\n' + '\n' + '\n' +
              'Assinatura QR CODE: ' + this.items[0]['assinaturaQrCode'] + '\n';
              this.boxRetornoSat += '----------------------------------' + '\n' + boxRetornoSatOld;
              //Atualiza a tela da aplicação com as novas informações na caixa de retorno
              this.changeRef.detectChanges();
          }
        },
        err => { 
          console.log(err);
          this.alertSat(err);
        }
      );
    else 
      this.alertSatPopUp("Código de Ativação deve ter entre 8 a 32 caracteres!");  
  }

  async cancelarVendaAlert() {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: `Digite a chave de cancelamento`,
      inputs: [
        {
          name: 'name2',
          type: 'textarea',
          value: this.chaveCancelamento
        }],    
      buttons: [
        {
          text: 'OK',
          handler: (alertData) => { //takes the data 
            if(alertData.name2 != null) {
              this.a112_gbotplugin.funcoesSat(
                {
                  "funcao": "CancelarUltimaVenda",
                  "codigoAtivacao": this.codigoAtv,
                  "chaveCancelamento": alertData.name2,
                  "xmlCancelamento": this.xmlCancelBase64,
                  "random": Math.floor(100000 + Math.random() * 900000)
                },
                res => {
                  this.items.push(res);
                  this.global.setCodAtv(this.codigoAtv);
                  if(this.items[0]['base64Codigo'] === "")
                    this.alertSat("Mensagem: " + this.items[0]['respostaRecebida']);
                  else {
                    let decodedXmlSefaz = atob(this.items[0]['base64Codigo']);
                    this.chaveCancelamento = this.items[0]['chaveConsulta'];
                    let boxRetornoSatOld = this.boxRetornoSat;
                    let now = moment().format("DD-MM-YYYY HH:mm:ss");
                    this.boxRetornoSat = now + '\n' + 'Número da Sessão: ' + this.items[0]['numeroSessao'] + '\n' +
                      'EEEEE: ' + this.items[0]['codigoEEEEE'] + '\n' +
                      'Mensagem: ' + this.items[0]['respostaRecebida'] + '\n' + 
                      'Timestamp: '+ this.items[0]['timeStamp'] + '\n' + 
                      'Chave de Consulta (Cfe): ' + this.items[0]['chaveConsulta'] + '\n' +
                      'Valor Total Cfe:' + this.items[0]['valorTotalCfe'] + '\n' +
                      'Arquivo Base 64 (Convertido para String): '+ this.escapeHtml(decodedXmlSefaz) +'\n' + '\n' + '\n' +
                      'Assinatura QR CODE: ' + this.items[0]['assinaturaQrCode'] + '\n';
                      this.boxRetornoSat += '----------------------------------' + '\n' + boxRetornoSatOld;
                      //Atualiza a tela da aplicação com as novas informações na caixa de retorno
                      this.changeRef.detectChanges();
                      console.log(decodedXmlSefaz);
                  }
                },
                err => { 
                  console.log(err);
                  this.alertSat(err);
                }
              );
            } else {
              this.alertSatPopUp("Digite uma chave de cancelamento");
            }
          }
        }
      ]
    });
    await alert.present();
  }

  cancelarVenda() {
    this.items = [];
    if(this.codigoAtv.length >= 8 && this.codigoAtv.length <= 32) 
      this.cancelarVendaAlert();
    else 
      this.alertSatPopUp("Código de Ativação deve ter entre 8 a 32 caracteres!");
  }

  async sessaoAlert() {
    this.items = [];
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: `Digite o número da sessão`,
      inputs: [
        {
          name: 'name1',
          type: 'number',
          value: 123
        }],    
      buttons: [
          {
            text: 'OK',
            handler: (alertData) => { //takes the data 
              if(alertData.name1 != null) {
                this.a112_gbotplugin.funcoesSat(
                  {
                    "funcao": "ConsultarNumeroSessao",
                    "chaveSessao": alertData.name1,
                    "codigoAtivacao": this.codigoAtv,
                    "random": Math.floor(100000 + Math.random() * 900000)
                  },
                  res => { 
                    this.global.setCodAtv(this.codigoAtv);
                    console.log(JSON.stringify(res))
                    this.items.push(res);
                    console.log(this.items[0]['respostaRecebida']);
                    let boxRetornoSatOld = this.boxRetornoSat;
                    let now = moment().format("DD-MM-YYYY HH:mm:ss");
                    this.boxRetornoSat = now + '\n' + 'Número da Sessão: ' + this.items[0]['numeroSessao'] + '\n' +
                      'EEEEE: ' + this.items[0]['codigoEEEEE'] + '\n' +
                      'Mensagem: ' + this.items[0]['respostaRecebida'] + '\n';;
                      this.boxRetornoSat += '----------------------------------' + '\n' + boxRetornoSatOld;
                      //Atualiza a tela da aplicação com as novas informações na caixa de retorno
                      this.changeRef.detectChanges();
                    
                  },
                  err => { 
                    this.items.push(err);
                    let boxRetornoSatOld = this.boxRetornoSat;
                    console.log(this.items[0]['respostaRecebida']);
                    let now = moment().format("DD-MM-YYYY HH:mm:ss");
                    this.boxRetornoSat = now + '\n' + 'Número da Sessão: ' + this.items[0]['numeroSessao'] + '\n' +
                      'EEEEE: ' + this.items[0]['codigoEEEEE'] + '\n' +
                      'Mensagem: ' + this.items[0]['respostaRecebida'] + '\n';;
                      this.boxRetornoSat += '----------------------------------' + '\n' + boxRetornoSatOld;
                      //Atualiza a tela da aplicação com as novas informações na caixa de retorno
                      this.changeRef.detectChanges();
                  }
                );
              }
            }
          }
      ]
    });
    await alert.present();
  }

  consultarSessao() {
    this.items = [];
    if(this.codigoAtv.length >= 8 && this.codigoAtv.length <= 32) 
      this.sessaoAlert();
    else 
      this.alertSatPopUp("Código de Ativação deve ter entre 8 a 32 caracteres!");
  }
}
