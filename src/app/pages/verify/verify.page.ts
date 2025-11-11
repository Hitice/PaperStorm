import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
  codeInputs: string[] = ['', '', '', ''];

  constructor(
    private authService: AuthServiceService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  async verifyEmail() {
    const verified = await this.authService.isEmailVerified();
    if (verified) {
      this.presentToast('Verificação concluída!');
      this.router.navigate(['/confirmation']);
    } else {
      this.presentToast('E-mail ainda não verificado. Verifique sua caixa de entrada.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }
}
