import { Component } from '@angular/core';
import {AuthService} from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-dashboard-page';
  constructor(public authService: AuthService) { }
  logout() {
    this.authService.doLogout()
  }
}
