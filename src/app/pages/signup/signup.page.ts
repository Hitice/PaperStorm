import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  ionicForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private authService: AuthServiceService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      contact: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}'
          ),
          Validators.required,
        ],
      ],
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  // -------------------------
  // 🔹 Cadastro tradicional
  // -------------------------
  async signUP() {
    const loading = await this.loadingController.create();
    await loading.present();

    if (this.ionicForm.valid) {
      const user = await this.authService
        .registerUser(
          this.ionicForm.value.email,
          this.ionicForm.value.password,
          this.ionicForm.value.fullname
        )
        .catch((err) => {
          this.presentToast(err.message || err);
          console.log(err);
          loading.dismiss();
        });

      if (user) {
        loading.dismiss();
        this.router.navigate(['/home']);
      }
    } else {
      await loading.dismiss();
      this.presentToast('Please fill in all required fields');
    }
  }

  // -------------------------
  // 🔹 Login social
  // -------------------------
  async signUpWithGoogle() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService
      .loginWithGoogle()
      .then(() => {
        loading.dismiss();
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        loading.dismiss();
        this.presentToast(err.message || 'Google Sign-In failed');
      });
  }

  async signUpWithApple() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService
      .loginWithApple()
      .then(() => {
        loading.dismiss();
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        loading.dismiss();
        this.presentToast(err.message || 'Apple Sign-In failed');
      });
  }

  // -------------------------
  // 🔹 Toast helper
  // -------------------------
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'top',
      color: 'danger',
    });
    await toast.present();
  }
}
