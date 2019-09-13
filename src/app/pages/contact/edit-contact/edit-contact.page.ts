import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { Result } from 'src/app/models/result.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactUtil } from 'src/app/utils/contact.util';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {
  public form: FormGroup;
  public contact: Contact = new Contact();
  public mode: string = 'create';

  constructor(private service: ContactService, private fb: FormBuilder, private router: ActivatedRoute, private navCtrl: NavController) {
    const selectedContact = ContactUtil.get();
    if (selectedContact) {
      this.contact = selectedContact;
      this.mode = 'update';
    }
    this.form = this.fb.group({
      name: [this.contact.name, Validators.minLength(6)],
      id: [this.contact.id],
      email: [this.contact.email, Validators.minLength(6)],
      phoneNumber: [this.contact.phoneNumber, Validators.minLength(6)],
      address: [this.contact.address, Validators.minLength(6)],
      image: ['https://picsum.photos/300/'],
      governmentId: [this.contact.governmentId, Validators.minLength(6)]
    });
  }

  ngOnInit() {

  }

  addContact() {
    this.form.disable();
    this.service.addContact(this.form.value).subscribe((res: Result) => {
      console.log(res.message);
      if (res.success)
        this.navCtrl.navigateBack('/home');
    }, (err) => {
      console.log("Erro ao Cadastrar");
      this.form.enable();
    });
  }

  updateContact() {
    this.form.disable();
    this.service.updateContact(this.form.value).subscribe((res: Result) => {
      console.log(res.message);
      if (res.success)
        this.navCtrl.navigateBack('/home');
    }, (err) => {
      console.log("Erro ao Alterar");
      this.form.enable();
    });
  }
}
