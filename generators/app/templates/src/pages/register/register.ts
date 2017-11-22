import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { LoadingService } from './../../services/loading.service';
import { ToastService } from './../../services/toast.service';

import { UserModel } from '../../models/user.model';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private signUpForm: FormGroup;
  private newUser: UserModel;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private afAuth: AngularFireAuth,
    private toastService: ToastService, private loadingService: LoadingService) {
    this.validationForm();
  }

  validationForm(): void {
    const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.pattern(emailValidator), Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      passwordConfirmation: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    }, { validator: checkPassword });
  }

  validateFields(): void {
    if (this.signUpForm.invalid)
      this.signUpForm.markAsPending();
  }

  signUp(): void {
    if (!this.signUpForm.valid) {
      Object.keys(this.signUpForm.controls).forEach(field => {
        const control = this.signUpForm.get(field);
        control.markAsTouched({ onlySelf: true });        
      });
      this.validateFields();
      return;
    }

    this.newUser = this.signUpForm.value;

    this.loadingService.presentLoading();

    this.afAuth.auth.createUserWithEmailAndPassword(
      this.newUser.email,
      this.newUser.password
    )
      .then((response: firebase.User) => {
        response.sendEmailVerification();

        this.toastService.presentToast('User created.');
        this.loadingService.dissmissLoading();
        this.navCtrl.setRoot('LoginPage');
      })
      .catch(error => {
        this.toastService.presentToast(error.message);
        this.loadingService.dissmissLoading();
      });
  }

}

// Password Confirmation Validator
const checkPassword = (control: AbstractControl): { [key: string]: boolean } => {
  let pass = control.get('password');
  let passConfirm = control.get('passwordConfirmation');

  if (!pass || !passConfirm)
    return null;

  return pass.value === passConfirm.value ? null : { nomatch: true };
};
