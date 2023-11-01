import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    public angularFirestore: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  signUp(email: string, password: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.sendVerificationMail();
        this.setUserData(res.user);
      })
      .catch((err) => window.alert(err.message));
  }

  async signIn(email: string, password: string) {
    return await this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res: any) => {
        this.ngZone.run(() => this.router.navigate(['dashboard']));
        this.setUserData(res.user);
      })
      .catch((err) => window.alert(err.message));
  }

  async sendVerificationMail() {
    return await this.angularFireAuth.currentUser
      .then((user) => {
        user?.sendEmailVerification();
      })
      .then(() => this.router.navigate(['verify-email']));
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return userRef.set(userData, { merge: true });
  }

  async signOut() {
    await this.angularFireAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['signin']);
      })
      .catch((err) => console.log('Error while signing out the user: ', err));
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  getCurrentToken() {
    const user = JSON.parse(localStorage.getItem('user')!);
    const token = user !== null ? user.stsTokenManager.accessToken : null;
    return token;
  }

  getThis() { return 'jaaaa' }
}
