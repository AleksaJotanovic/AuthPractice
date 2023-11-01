import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @Input() userData: any;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.userData = this.authService.userData;
  }

  signOut() {
    this.authService.signOut();
  }
}
