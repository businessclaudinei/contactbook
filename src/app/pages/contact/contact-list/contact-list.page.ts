import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { ToastController } from '@ionic/angular';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.page.html',
  styleUrls: ['./contact-list.page.scss'],
})
export class ContactListPage implements OnInit {
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
