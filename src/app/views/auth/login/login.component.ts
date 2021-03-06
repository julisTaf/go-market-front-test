import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
    constructor(
      public fb: FormBuilder,
      public authService: AuthService,
      public router: Router
    ) {
      this.signinForm = this.fb.group({
        email: [''],
        password: [''],
      });
    }
  ngOnInit() {
      if (this.authService.isLoggedIn) {
        this.router.navigate(['list'])
      }
  }
  loginUser() {
    this.authService.signIn(this.signinForm.value);
  }
}
