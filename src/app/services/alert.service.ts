import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  async showAlertDUOC(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje DUOC',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}