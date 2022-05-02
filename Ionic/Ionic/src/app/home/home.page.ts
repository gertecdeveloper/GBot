import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
declare var cordova;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  a112_gbotplugin: any;
  constructor(
    private router: Router , public alertController: AlertController
  ) {
    
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Retorno',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }
    codigoBarras(){
      this.a112_gbotplugin = cordova.plugins.a112_gbotplugin;
      this.a112_gbotplugin.codbar(
      sucess => this.presentAlert(sucess) ,
      error => this.presentAlert(error)
     );
    }

    nfc(){
      this.router.navigate(['nfc']);
    }
    sensor() {
      this.a112_gbotplugin = cordova.plugins.a112_gbotplugin;
      this.a112_gbotplugin.sensor(
      sucess => this.presentAlert(sucess) ,
      error => this.presentAlert(error)
     );
    }
    falaGBot(){
      this.router.navigate(['falagbot']);
    }

    tef(){
      this.router.navigate(['tef']);
    }

    sat(){
      this.router.navigate(['sat']);
    }

    modoKiosk(){
      this.a112_gbotplugin = cordova.plugins.a112_gbotplugin;
      this.a112_gbotplugin.kiosk(
      sucess => this.presentAlert(sucess) ,
      error => this.presentAlert(error)
     );
    }
}
