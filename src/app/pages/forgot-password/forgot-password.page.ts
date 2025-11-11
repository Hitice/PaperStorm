import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email: string = '';

  constructor(
    private authService: AuthServiceService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  async reset() {
    try {
      await this.authService.resetPassword(this.email);
      this.presentToast('Seu link de redefinição foi enviado para o e-mail informado.');
    } catch {
      this.presentToast('Erro ao enviar link de redefinição.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
    toast.onDidDismiss().then(() => this.router.navigate(['/login']));
  }
}
