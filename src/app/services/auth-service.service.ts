import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private ngFireAuth: AngularFireAuth) {}

  // -------------------------
  // 📘 Email e senha
  // -------------------------
  async registerUser(email: string, password: string, name: string): Promise<firebase.User | null> {
    const result = await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
    if (result.user) {
      await result.user.updateProfile({ displayName: name });
      await this.sendVerificationEmail();
    }
    return result.user;
  }

  async loginUser(email: string, password: string): Promise<firebase.User | null> {
    const result = await this.ngFireAuth.signInWithEmailAndPassword(email, password);
    return result.user;
  }

  async resetPassword(email: string): Promise<void> {
    await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  async sendVerificationEmail(): Promise<void> {
    const user = await this.ngFireAuth.currentUser;
    if (user) await user.sendEmailVerification();
  }

  async isEmailVerified(): Promise<boolean> {
    const user = await this.ngFireAuth.currentUser;
    await user?.reload();
    return !!user?.emailVerified;
  }

  async getProfile(): Promise<firebase.User | null> {
    return new Promise<firebase.User | null>((resolve, reject) => {
      this.ngFireAuth.onAuthStateChanged(
        (user) => (user ? resolve(user) : resolve(null)),
        reject
      );
    });
  }

  // -------------------------
  // 🔵 Login com Google
  // -------------------------
  async loginWithGoogle(): Promise<firebase.User | null> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await this.ngFireAuth.signInWithPopup(provider);
      return result.user;
    } catch (error) {
      throw new Error(this.handleFirebaseError(error));
    }
  }

  // -------------------------
  // ⚫ Login com Apple
  // -------------------------
  async loginWithApple(): Promise<firebase.User | null> {
    try {
      const provider = new firebase.auth.OAuthProvider('apple.com');
      provider.addScope('email');
      provider.addScope('name');

      const result = await this.ngFireAuth.signInWithPopup(provider);
      return result.user;
    } catch (error) {
      throw new Error(this.handleFirebaseError(error));
    }
  }

  // -------------------------
  // 🚪 Logout
  // -------------------------
  async logout(): Promise<void> {
    try {
      await this.ngFireAuth.signOut();
    } catch (error) {
      throw new Error(this.handleFirebaseError(error));
    }
  }

  // -------------------------
  // ❌ Deletar conta
  // -------------------------
  async deleteAccount(): Promise<void> {
    const user = await this.ngFireAuth.currentUser;
    if (!user) throw new Error('Nenhum usuário autenticado.');

    try {
      await user.delete();
    } catch (error) {
      throw new Error(this.handleFirebaseError(error));
    }
  }

  // -------------------------
  // ⚙️ Tratamento de erros Firebase
  // -------------------------
  private handleFirebaseError(error: any): string {
    if (error && error.code) {
      switch (error.code) {
        case 'auth/requires-recent-login':
          return 'É necessário fazer login novamente para excluir sua conta.';
        case 'auth/network-request-failed':
          return 'Falha de conexão. Verifique sua internet.';
        case 'auth/invalid-email':
          return 'E-mail inválido.';
        case 'auth/user-disabled':
          return 'Usuário desativado.';
        case 'auth/user-not-found':
          return 'Usuário não encontrado.';
        case 'auth/wrong-password':
          return 'Senha incorreta.';
        default:
          return 'Erro de autenticação: ' + error.message;
      }
    }
    return error?.message || 'Erro inesperado.';
  }
}
