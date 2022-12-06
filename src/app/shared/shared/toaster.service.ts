import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private bannerToast: any;

  constructor(private toastCtrl: ToastController) { }

  async success(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      // duration: 2000,
      color: 'success',
      position: 'top',
    });
    toast.present();
  }

  async error(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 0,
      color: 'danger',
      position: 'top',
      buttons: [
        {
          text: ' x ',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async info(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'secondary',

    });
    toast.present();
  }

  async showBanner(msg: string, isError: boolean) {
    if (isError) {
      this.errorBanner(msg);
    }
    else {
      this.successBanner(msg)
    }
  }

  private async errorBanner(msg) {
    this.bannerToast = await this.toastCtrl.create({
      message: msg,
      duration: 10000,
      position: 'top',
      color: 'error',
      cssClass: 'xtoaster',
      buttons: [
        {
          text: ' x ',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    this.bannerToast.present();
  }

  private async successBanner(msg) {
    this.bannerToast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top',
      color: 'success',
      cssClass: 'xtoaster',
    });
    this.bannerToast.present();
  }

  hideToast() {
    if (this.bannerToast != null || this.bannerToast != undefined) {
      this.bannerToast = this.bannerToast?.dismiss();
    }
  }

}
