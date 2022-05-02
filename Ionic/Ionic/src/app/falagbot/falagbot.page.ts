import { Component, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx'
import { AlertController } from '@ionic/angular';
declare var cordova;
@Component({
  selector: 'app-falagbot',
  templateUrl: './falagbot.page.html',
  styleUrls: ['./falagbot.page.scss'],
})
export class FalagbotPage implements OnInit {
  mensagem: string;
  a112_gbotplugin: any;
  ngOnInit() {

  }
  
  constructor( public alertController: AlertController,private tts: TextToSpeech) { 
    
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Retorno',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async fala1(){
    this.tts.speak({
      text: "Sejam todos vem vindos à apresentação do G-Bot",
      locale: 'pt-BR',
      rate: 1
    })
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }
 
  async fala2(){
    this.tts.speak({
      text: "Possui reconhecimento facial",
      locale: 'pt-BR',
      rate: 1
    })
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }

  async fala3(){
    this.tts.speak({
      text: "Microfone e leitor NFC",
      locale: 'pt-BR',
      rate: 1
    })
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }
 
  async falaPersonalizada(){
    if( this.mensagem == null || this.mensagem == ' '){
      await this.presentAlert('Escreva uma frase');
    }
    else{
      this.tts.speak({
        text: this.mensagem,
        locale: 'pt-BR',
        rate: 1
      })
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
    }
  }
  
}

