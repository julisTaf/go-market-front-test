import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/user';
import {AuthService} from '../../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  navbarOpen = false;
  currentUser = new User();
  isLogged : boolean | undefined;

  constructor(
    public authService: AuthService,
    public router: Router,
    ) {}

  ngOnInit(): void {
    this.isLogged = this.authService.isLoggedIn
    if (this.isLogged){
      this.authService.getUserDataFromStorage().subscribe(
        res => {
          this.currentUser = res
        }
      )
    }
  }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.authService.doLogout()
  }

  goToRegister(){
    this.router.navigate(['auth/register'])
  }

  goToNewDeal() {
    this.router.navigate(['new-deal'])
  }
}
