import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { Result } from 'src/app/models/result.model';
import { MessageUtil } from 'src/app/utils/message.util';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  public form: FormGroup;

  constructor(private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private fb: FormBuilder,
    private service: AuthService,
    private loadingController: LoadingController) {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, CustomValidator.isEmail])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() {
  }

  async submit() {
    const loading = await this.loadingController.create({
      message: "Alterando senha..."
    });
    loading.present();

    this.service.resetPassword(this.form.value)
      .subscribe((res: Result) => {
        loading.dismiss();
        MessageUtil.showSuccess(res.message, this.alertCtrl, () => {
          if (res.success)
            this.navCtrl.navigateRoot('/login');
        });
      }, (err: any) => {
        loading.dismiss();
        MessageUtil.showError('Falha ao alterar senha', this.toastCtrl);
      }, () => {
      });
  }

}
