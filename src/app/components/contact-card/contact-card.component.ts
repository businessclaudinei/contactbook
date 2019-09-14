import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact.model';
import { Component, OnInit, Input } from '@angular/core';
import { ContactUtil } from 'src/app/utils/contact.util';
import { NavController, ModalController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { ContactDetailsPage } from 'src/app/pages/contact/contact-details/contact-details.page';
import { Result } from 'src/app/models/result.model';
import { MessageUtil } from 'src/app/utils/message.util';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
})
export class ContactCardComponent implements OnInit {
  @Input() public contact: Contact = new Contact();
  @Input() public contacts: Contact[] = [];
  constructor(private navCtrl: NavController,
    public modalController: ModalController,
    private service: ContactService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() { }

  editContact(contact: Contact) {
    ContactUtil.set(contact);
    this.navCtrl.navigateRoot('/editor');
  }

  async removeContact(contact: Contact) {
    const alert = await this.alertCtrl.create({
      message: "Tem certeza que deseja excluir " + contact.name + " da sua lista de contatos?",
      buttons: [{
        text: 'SIM',
        handler: async () => {
          alert.dismiss();
          const loading = await this.loadingController.create({
            message: "Removendo o contato..."
          });
          loading.present();

          this.service.removeContact(contact).subscribe((res: Result) => {
            loading.dismiss();
            MessageUtil.showError(res.message, this.toastCtrl);
            this.contacts.splice(this.contacts.indexOf(this.contact), 1);
          }, (err) => {
            console.log(err);
            loading.dismiss();
            MessageUtil.showError("Erro ao Cadastrar", this.toastCtrl);
          });
        }
      }, {
        text: 'NÃO',
        handler: () => {
          alert.dismiss();
        }
      }]
    });
    alert.present();
  }


  async presentModal(contact: Contact) {
    const modal = await this.modalController.create({
      component: ContactDetailsPage,
      componentProps: { 'contact': contact }
    });
    return await modal.present();
  }

}
