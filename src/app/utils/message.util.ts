import { ToastController, AlertController } from '@ionic/angular';
export class MessageUtil {
    static async showError(message: string, toastCtrl: ToastController) {
        const toast = await toastCtrl.create({
            message: message,
            duration: 3000,
            showCloseButton: true,
            closeButtonText: 'Fechar'
        });

        toast.present();
    }

    static async showSuccess(message: string, alertCtrl: AlertController, fallback: any) {
        const alert = await alertCtrl.create({
            message: message,
            buttons: [{
                text: 'OK',
                handler: fallback
            }]
        });
        alert.present();
    }
}