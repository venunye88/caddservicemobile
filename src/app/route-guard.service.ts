import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { AppRouteNames } from './shared/shared/config-keys';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // let url: string = state.url;
    return this.checkLogin(route);
  }

  checkLogin(route: ActivatedRouteSnapshot): boolean {

    if (this.authService.isLoggedIn()) {
      // var user = this.authService.currentUser;
     return true
    }

    this.router.navigate([AppRouteNames.Login]);
    return false;
  }

}
