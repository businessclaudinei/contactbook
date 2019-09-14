import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { Result } from 'src/app/models/result.model';
import { Contact } from 'src/app/models/contact.model';
import { ContactUtil } from 'src/app/utils/contact.util';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.page.html',
  styleUrls: ['./contact-list.page.scss'],
})
export class ContactListPage implements OnInit {
  public contacts: any[];
  constructor(private service: ContactService,
    private navCtrl: NavController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadContacts();
  }

  async loadContacts() {
    const loading = await this.loadingController.create({
      message: "Carregando contatos..."
    });
    loading.present();

    this.service.getContacts().subscribe((res: Result) => {
      this.contacts = res.data;
      loading.dismiss();
    }, (err) => {
      console.log(err);
      loading.dismiss();
    });
  }

  addContact() {
    ContactUtil.clear();
    this.navCtrl.navigateRoot('/editor');
  }

  ngOnChanges() {
    this.loadContacts();
  }
}
