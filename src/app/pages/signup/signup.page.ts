import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { FirebaseError } from '@angular/fire/app';

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
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@!%*?&]).{8,}'),
        ],
      ],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]],
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  async signUP() {
    const loading = await this.loadingController.create({ message: 'Criando conta...' });
    await loading.present();

    try {
      if (!this.ionicForm.valid) throw new Error('Preencha todos os campos corretamente.');
      const { email, password, fullname } = this.ionicForm.value;
      await this.authService.registerUser(email, password, fullname);

      await loading.dismiss();
      this.presentToast('Conta criada com sucesso. Verifique seu e-mail.');
      this.router.navigate(['/verify']);
    } catch (err: any) {
      await loading.dismiss();
      this.presentToast(this.getErrorMessage(err));
    }
  }

  async signUpWithGoogle() {
    const loading = await this.loadingController.create({ message: 'Conectando com Google...' });
    await loading.present();
    try {
      await this.authService.loginWithGoogle();
      await loading.dismiss();
      this.router.navigate(['/home']);
    } catch (err: any) {
      await loading.dismiss();
      this.presentToast(this.getErrorMessage(err));
    }
  }

  async signUpWithApple() {
    const loading = await this.loadingController.create({ message: 'Conectando com Apple...' });
    await loading.present();
    try {
      await this.authService.loginWithApple();
      await loading.dismiss();
      this.router.navigate(['/home']);
    } catch (err: any) {
      await loading.dismiss();
      this.presentToast(this.getErrorMessage(err));
    }
  }

  getErrorMessage(error: any): string {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          return 'Este e-mail já está em uso.';
        case 'auth/invalid-email':
          return 'E-mail inválido.';
        case 'auth/weak-password':
          return 'A senha deve ter pelo menos 8 caracteres e conter letras maiúsculas, minúsculas, número e símbolo.';
        case 'auth/popup-closed-by-user':
          return 'Janela de login fechada antes de finalizar.';
        case 'auth/user-disabled':
          return 'Esta conta foi desativada.';
        case 'auth/network-request-failed':
          return 'Falha de conexão. Verifique sua internet.';
        default:
          return 'Erro desconhecido: ' + error.message;
      }
    }
    return error.message || 'Erro inesperado.';
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'top',
      color: 'dark',
    });
    await toast.present();
  }
}
