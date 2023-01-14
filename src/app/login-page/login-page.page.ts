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
  static USERNAME: string = 'test@test.com';
  static PASSWORD: String = '8256455';
  loginform: any = FormGroup;
  errormsg: string | undefined;
  constructor(private formBuilder: FormBuilder, private route: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  async onSubmit() {
    this.errormsg = "";
    let flag = false;
    if (this.loginform.value.email == LoginPagePage.USERNAME) {
      flag = true;
    } else {
      this.errormsg = "wrong email";
      this.presentToast('top');
      flag = false
      return;
    }
    if (this.loginform.value.password == LoginPagePage.PASSWORD) {
      flag = true;
    } else {
      this.errormsg = "wrong password";
      this.presentToast('top');
      flag = false;
      return;
    }
    if (flag) {

      await Preferences.set({
        key: 'loginCredential',
        value: JSON.stringify(this.loginform.value)
      })
    }
    this.route.navigate(['/home']);
    this.loginform.reset();
  }

  async presentToast(position: 'top') {
    const toast = await this.toastController.create({
      message: this.errormsg,
      duration: 1500,
      position: position
    });

    await toast.present();
  }

}
