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
  async registerUser(email: string, password: string, name: string) {
    const result = await this.ngFireAuth.createUserWithEmailAndPassword(email, password);
    if (result.user) {
      await result.user.updateProfile({ displayName: name });
    }
    return result.user;
  }

  async loginUser(email: string, password: string) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  async resetPassword(email: string) {
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  async getProfile(): Promise<firebase.User | null> {
    return new Promise<firebase.User | null>((resolve, reject) => {
      this.ngFireAuth.onAuthStateChanged(
        (user) => (user ? resolve(user) : resolve(null)),
        reject
      );
    });
  }

  async signOut() {
    return await this.ngFireAuth.signOut();
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
      console.error('Erro no login com Google:', error);
      throw error;
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
      console.error('Erro no login com Apple:', error);
      throw error;
    }
  }
}
