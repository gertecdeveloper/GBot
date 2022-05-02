import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Platform, AlertController } from '@ionic/angular'
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { stringify } from 'querystring';
@Component({
  selector: 'app-nfc',
  templateUrl: './nfc.page.html',
  styleUrls: ['./nfc.page.scss'],
})
export class NfcPage implements OnInit, OnDestroy {
  mensagem: string;
  tagId: string;
  lendo: boolean = false;
  escrevendo: boolean = false;
  
  
  listenerAdicionado: boolean = false;

  anyButtonClicked: boolean = false;
  opcoesIndex = 0;
  opcoes: string[] =[ "Gravar cartão" , "Leitura do Cartão NFC", "Formatar Cartão" , "Gravar/Ler Cartão"]

  outputBox = '';
  constructor(public platform: Platform,
   
    private nfc: NFC,
    private ndef: Ndef,
    public alertController: AlertController
    ) {

    

} 

  
  ngOnInit() {
  }
  ngOnDestroy(){
    this.nfc = null;
  }
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg
      
     
    });
    await alert.present();
  }

  
  initializeNFC(){
    if(this.listenerAdicionado == false && this.nfc != null){
      this.nfc.addNdefListener( ).subscribe(
        tagDiscoveredEvent => {  this.readTagEvent(tagDiscoveredEvent.tag); },
        err => { this.presentAlert("Error adding listener!")}
      )
      this.listenerAdicionado = true;
      this.nfc.addTagDiscoveredListener().subscribe(
        tagDiscoveredEvent => { this.presentAlert ('Este cartão não é NDEF!\n'+ 'ID Cartão: ' + this.converteId(this.nfc.bytesToHexString(tagDiscoveredEvent.tag.id)) )}
      )
      
       
    
    }
      
  }

  escreverNFC(){
    this.escrevendo = true;
    this.lendo = false;
    this.anyButtonClicked = true;
    this.opcoesIndex = 0;
  }
  
  lerNFC(){
    this.escrevendo = false;
    this.lendo = true;
    this.anyButtonClicked = true;
    this.opcoesIndex = 1;
  }

  formatarNFC(){
    this.presentAlert('Esta funcionalidade não esta disponível nesta tecnologia!')
  }
  testeNFC(){
    this.presentAlert('Esta funcionalidade não esta disponível nesta tecnologia!')
  }



  converteId(id:string) {
    
    var values: string[];
    values = [];

    var msg: string = "";
    var cont = 0;
   
    for (var i = 0; i < id.length; i++) {
      cont++;
      msg += id[i];
      if (cont == 2) {
        values.push(msg);
        msg = "";
        cont = 0;
      }
    }

    var idInvertido : string = "";

    for (var i = values.length - 1; i > -1; i--) {
      idInvertido += values[i];
    }
   
   return parseInt(idInvertido,16);
  }

  async readTagEvent(tag){
    if(this.escrevendo){
      if(this.mensagem != null && this.mensagem != undefined && this.mensagem != ''){
        var message = [
          this.ndef.textRecord(this.mensagem),
        ];
  
        this.nfc.write(message).then(
          onSucess => this.outputBox = 'Sucesso ao gravar informação!',
          err => this.outputBox = 'Erro ao gravar informação!'
        )
      }
      else{
        this.presentAlert("Digite uma mensagem para gravar no cartão");
      }
    }
    else if (this.lendo){
      this.outputBox = 'ID Cartão: ' + this.converteId(this.nfc.bytesToHexString(tag.id)) + '\n'
      this.outputBox += this.ndef.textHelper.decodePayload(tag.ndefMessage[0].payload);
    }
  }
}

  