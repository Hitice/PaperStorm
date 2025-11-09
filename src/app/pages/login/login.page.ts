import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthServiceService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  // -----------------------------
  // 🔐 Login com email/senha
  // -----------------------------
  async login() {
    const loading = await this.loadingController.create({ message: 'Logging in...' });
    await loading.present();

    if (this.ionicForm.valid) {
      try {
        const user = await this.authService.loginUser(
          this.ionicForm.value.email,
          this.ionicForm.value.password
        );
        await loading.dismiss();

        if (user) {
          this.presentToast('Login successful!');
          this.router.navigate(['/journals']);
        }
      } catch (err: any) {
        await loading.dismiss();
        this.presentToast(err.message || 'Login failed.');
        console.error(err);
      }
    } else {
      await loading.dismiss();
      this.presentToast('Please fill in all required fields.');
    }
  }

  // -----------------------------
  // 🔵 Login com Google
  // -----------------------------
  async loginWithGoogle() {
    const loading = await this.loadingController.create({ message: 'Connecting to Google...' });
    await loading.present();

    try {
      const user = await this.authService.loginWithGoogle();
      await loading.dismiss();

      if (user) {
        this.presentToast(`Welcome ${user.displayName || 'User'}!`);
        this.router.navigate(['/journals']);
      }
    } catch (err: any) {
      await loading.dismiss();
      console.error('Google login error:', err);
      this.presentToast('Google login failed.');
    }
  }

  // -----------------------------
  // ⚫ Login com Apple
  // -----------------------------
  async loginWithApple() {
    const loading = await this.loadingController.create({ message: 'Connecting to Apple...' });
    await loading.present();

    try {
      const user = await this.authService.loginWithApple();
      await loading.dismiss();

      if (user) {
        this.presentToast(`Welcome ${user.displayName || 'User'}!`);
        this.router.navigate(['/journals']);
      }
    } catch (err: any) {
      await loading.dismiss();
      console.error('Apple login error:', err);
      this.presentToast('Apple login failed.');
    }
  }

  // -----------------------------
  // 🧩 Utils
  // -----------------------------
  get errorControl() {
    return this.ionicForm.controls;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'dark',
    });
    await toast.present();
  }
}
