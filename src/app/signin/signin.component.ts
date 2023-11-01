import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  constructor(private authService: AuthService) {}

  signIn(email: string, password: string) {
    this.authService.signIn(email, password);
  }
}
