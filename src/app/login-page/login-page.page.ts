import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  static readonly USERNAME: string = 'test@test.com';
  static readonly PASSWORD: string = '8256455';
  loginform!: FormGroup;
  errormsg: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    this.errormsg = '';
    if (this.loginform.value.email !== LoginPagePage.USERNAME) {
      this.errormsg = 'Wrong email';
      await this.presentToast('bottom');
      return;
    }
    if (this.loginform.value.password !== LoginPagePage.PASSWORD) {
      this.errormsg = 'Wrong password';
      await this.presentToast('bottom');
      return;
    }

    await Preferences.set({
      key: 'loginCredential',
      value: JSON.stringify(this.loginform.value)
    });
    this.router.navigate(['/home']);
    this.loginform.reset();
  }

  async presentToast(position: 'bottom') {
    const toast = await this.toastController.create({
      message: this.errormsg,
      duration: 1500,
      position,
    });
    await toast.present();
  }
}
