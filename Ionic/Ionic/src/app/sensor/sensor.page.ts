import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
declare var cordova;
@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.page.html',
  styleUrls: ['./sensor.page.scss'],
})
export class SensorPage implements OnInit {
  a112_gbotplugin: any;
  constructor(public alertController: AlertController) {
    this.a112_gbotplugin = cordova.plugins.a112_gbotplugin;
    this.a112_gbotplugin.sensor(
      sucess => this.presentAlert(sucess) ,
      error => this.presentAlert(error)
    );
   }

  ngOnInit() {
  }
  
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Retorno',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  
}
