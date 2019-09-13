import { MessageUtil } from './../../utils/message.util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public form: FormGroup;

  constructor(private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private fb: FormBuilder,
    private service: AuthService,
    private loadingController: LoadingController) {
    this.form = this.fb.group({
      name: ['', Validators.minLength(6)],
      email: ['', Validators.minLength(6)],
      username: ['', Validators.minLength(6)],
      password: ['', Validators.minLength(6)]
    });
  }

  ngOnInit() {
  }

  async submit() {
    const loading = await this.loadingController.create({
      message: "Criando usuario..."
    });
    loading.present();

    this.service.createUser(this.form.value)
      .subscribe((res: Result) => {
        loading.dismiss();
        MessageUtil.showSuccess(res.message, this.alertCtrl, () => {
          if (res.success)
            this.navCtrl.navigateRoot('/login');
        });
      }, (err: any) => {
        loading.dismiss();
        MessageUtil.showError('Falha ao cadastrar', this.toastCtrl);
      }, () => {
      });

  }
}
