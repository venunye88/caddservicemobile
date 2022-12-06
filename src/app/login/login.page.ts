import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginParams, AuthService } from '../services/auth.service';
import { LoadingMessages, AppRouteNames } from '../shared/shared/config-keys';
import { LoaderService } from '../shared/shared/loader.service';
import { ToasterService } from '../shared/shared/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup
  loginParams: LoginParams
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private loading: LoaderService, private toaster: ToasterService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  async login(credentials: LoginParams) {
    try {
      this.loading.start(LoadingMessages.LoggingIn);
      let userData = await this.authService.login(credentials);
      if (!userData) return;
      this.authService.setUser(userData);
      this.loading.stop()
      this.router.navigate([AppRouteNames.Home])

    } catch (error) {
      this.loading.stop()
    }
  }
}
