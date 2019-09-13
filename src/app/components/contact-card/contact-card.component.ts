import { Contact } from 'src/app/models/contact.model';
import { Component, OnInit, Input } from '@angular/core';
import { ContactUtil } from 'src/app/utils/contact.util';
import { NavController, ModalController } from '@ionic/angular';
import { ContactDetailsPage } from 'src/app/pages/contact/contact-details/contact-details.page';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
})
export class ContactCardComponent implements OnInit {
  @Input() public contact: Contact = new Contact();
  constructor(private navCtrl: NavController, public modalController: ModalController) { }

  ngOnInit() { }

  editContact(contact: Contact) {
    ContactUtil.set(contact);
    this.navCtrl.navigateForward('/editor');
  }

  async presentModal(contact: Contact) {
    const modal = await this.modalController.create({
      component: ContactDetailsPage,
      componentProps: { 'contact': contact }
    });
    return await modal.present();
  }

}
