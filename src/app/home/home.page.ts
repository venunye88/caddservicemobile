import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { AppRouteNames } from '../shared/shared/config-keys';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: User;
  loading:boolean=false;

  constructor(public authService: AuthService, private router: Router) { }
  
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.user = this.authService.currentUser;
    }
    this.fakeLoader();
  }

  fakeLoader(){
    this.loading=true;
    setTimeout(()=>{this.loading=false;},5000)
  }

  changePassword() {
    this.router.navigate([AppRouteNames.ChangePassword]);
  }

  logout() {
    this.authService.logout()
  }


}
