import { Contact } from 'src/app/models/contact.model';
import { Component, OnInit, Input } from '@angular/core';
import { ContactUtil } from 'src/app/utils/contact.util';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
})
export class ContactCardComponent implements OnInit {
  @Input() public contact: Contact = new Contact();
  constructor(private navCtrl: NavController) { }

  ngOnInit() { }

  editContact(contact: Contact) {
    ContactUtil.set(contact);
    this.navCtrl.navigateForward('/editor');
  }

}
