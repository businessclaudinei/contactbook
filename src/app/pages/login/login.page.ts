import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
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
    private loadingCtrl: LoadingController) {
    this.form = this.fb.group({
      username: ['', Validators.minLength(6)],
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
        this.showSuccess(res.data);
        loading.dismiss();
      },
      (err: any) => {
        this.showError('Usuario com senha inválida!');
        loading.dismiss();
      });
  }

  async showError(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Fechar'
    });

    toast.present();
  }

  async showSuccess(user: User) {
    UserUtil.set(user);
    this.navCtrl.navigateRoot('/');
  }

}
