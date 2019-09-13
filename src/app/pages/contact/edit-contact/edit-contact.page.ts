import { CustomValidator } from './../../../validators/custom.validator';
import { MessageUtil } from './../../../utils/message.util';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { Result } from 'src/app/models/result.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactUtil } from 'src/app/utils/contact.util';
import { NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {
  public form: FormGroup;
  public contact: Contact = new Contact();
  public mode: string = 'create';

  constructor(private service: ContactService,
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingController: LoadingController,
    private alertCtrl: AlertController) {

    const selectedContact = ContactUtil.get();
    if (selectedContact) {
      this.contact = selectedContact;
      this.mode = 'update';
    }

    this.form = this.fb.group({
      name: [this.contact.name, Validators.minLength(6)],
      id: [this.contact.id],
      email: [this.contact.email, Validators.compose([CustomValidator.isEmail, Validators.required])],
      phoneNumber: [this.contact.phoneNumber, Validators.minLength(11)],
      address: [this.contact.address, Validators.minLength(6)],
      image: ['https://picsum.photos/300/'],
      governmentId: [this.contact.governmentId, CustomValidator.isCpf]
    });
  }

  ngOnInit() {
  }

  async addContact() {
    this.form.disable();
    const loading = await this.loadingController.create({
      message: "Adicionando contato..."
    });
    loading.present();

    this.service.addContact(this.form.value).subscribe((res: Result) => {
      console.log(res.message);
      loading.dismiss();
      MessageUtil.showSuccess(res.message, this.alertCtrl, () => {
        if (res.success)
          this.navCtrl.navigateRoot('/home');
      });
    }, (err) => {
      console.log(err);
      loading.dismiss();
      MessageUtil.showError("Erro ao Cadastrar", this.toastCtrl)
      this.form.enable();
    });
  }

  async updateContact() {
    this.form.disable();
    const loading = await this.loadingController.create({
      message: "Alterando contato..."
    });
    loading.present();
    this.service.updateContact(this.form.value).subscribe((res: Result) => {
      console.log(res.message);
      loading.dismiss();
      MessageUtil.showSuccess(res.message, this.alertCtrl, () => {
        if (res.success)
          this.navCtrl.navigateRoot('/home');
      });
    }, (err) => {
      console.log(err);
      loading.dismiss();
      MessageUtil.showError("Erro ao Alterar", this.toastCtrl)
      this.form.enable();
    });
  }
}
