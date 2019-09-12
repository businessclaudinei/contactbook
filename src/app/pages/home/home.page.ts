import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ContactService } from 'src/app/services/contact.service';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public contacts: any[];
  constructor(private service: ContactService, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.service.getContacts().subscribe((res: Result) => {
      this.contacts = res.data;
    });
  }

  async showMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      closeButtonText: 'Fechar',
      duration: 3000,
      showCloseButton: true
    });
    toast.present();
  }
}
