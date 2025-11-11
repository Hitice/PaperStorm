import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  styleUrls: ['./panel.page.scss'],
})
export class PanelPage {
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
      this.presentToast('Você saiu da conta.');
    } catch (err: any) {
      this.presentToast(err.message || 'Erro ao sair.');
    }
  }

  async confirmDeleteAccount() {
    const alert = await this.alertController.create({
      header: 'Excluir conta',
      message: 'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          handler: async () => {
            try {
              await this.authService.deleteAccount();
              this.router.navigate(['/signup']);
              this.presentToast('Conta excluída com sucesso.');
            } catch (err: any) {
              this.presentToast(err.message || 'Erro ao excluir conta.');
            }
          },
        },
      ],
    });
    await alert.present();
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
