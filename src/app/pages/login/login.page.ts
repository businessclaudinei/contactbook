import { MessageUtil } from './../../utils/message.util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { UserUtil } from 'src/app/utils/user.util';
import { User } from 'src/app/models/user.model';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder,
    private service: AuthService,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.form = this.fb.group({
      email: ['', Validators.minLength(6)],
      password: ['', Validators.minLength(6)]
    });
  }

  ngOnInit() {
    const user = UserUtil.get();
    if (!user)
      this.navCtrl.navigateRoot('/');
  }

  async submit() {
    const loading = await this.loadingCtrl.create({
      message: "Autenticando..."
    });

    loading.present();

    this.service.auth(this.form.value).subscribe(
      (res: Result) => {
        loading.dismiss();
        if (res.success) {
          UserUtil.set(res.data);
          this.navCtrl.navigateRoot('/');
        } else {
          MessageUtil.showError(res.message, this.toastCtrl);
        }
      },
      (err: any) => {
        console.log(err);
        loading.dismiss();
        MessageUtil.showError('Falha ao realizar o login!', this.toastCtrl);
      });
  }

}
