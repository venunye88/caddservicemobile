import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ChangePassword, User } from '../models/user';
import { StoreKeys, AppRouteNames } from '../shared/shared/config-keys';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  // loggedInSource = new Subject<boolean>();
  // loggedIn$ = this.loggedInSource.asObservable();

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    let userStoreValue = localStorage.getItem(StoreKeys.CurrentUser);
    if (userStoreValue) this.currentUser = JSON.parse(localStorage.getItem(StoreKeys.CurrentUser));
  }

  login(credentials: LoginParams) {
    return this.http.post<LoginResponse>(`${environment.baseApi}/auth/login`, credentials).toPromise();
  }

  setUser(user: LoginResponse) {
    const userData = JSON.parse(atob(user.token.split('.')[1]));
    this.currentUser = <User>{
      username: userData.username,
      name: userData.name,
      // email: userData.email,
      // phoneNumber: userData.phoneNumber,
      // picture: userData.picture,
      verified: userData.verified,
      type: userData.type,

      // role: <Role>{
      //   name: userData.profile,
      //   privileges: (isObject(userData.roles)) ? userData.roles : [userData.roles]
      // }
    };

    localStorage.setItem(StoreKeys.Token, btoa(user.token))
    localStorage.setItem(StoreKeys.CurrentUser, JSON.stringify(this.currentUser))
  }

  setProfileData(user) {
    this.currentUser = <User>{
      username: user.username,
      name: user.name,
      // email: user.email,
      // phoneNumber: user.phoneNumber,
      // picture: user.picture,
      verified: user.verified,
      type: user.type,
    };

    localStorage.setItem(StoreKeys.CurrentUser, JSON.stringify(this.currentUser))
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem(StoreKeys.CurrentUser);
    localStorage.removeItem(StoreKeys.Token);
    this.router.navigate([AppRouteNames.Login])
  }

  // announceLogin(isLoggedIn: boolean) {
  //   this.loggedInSource.next(isLoggedIn)
  // }

  isLoggedIn() { return !!this.currentUser }

  changePassword(model: ChangePassword) {
    model.username = this.currentUser.username;
    return this.http.put<boolean>(`${environment.baseApi}/auth/changepassword`, model).toPromise();
  }

  updateUserProfile(model: User) {
    return this.http.put<LoginResponse>(`${environment.baseApi}/auth/updateuserprofile`, model).toPromise();
  }


  async getUserProfile() {
    var user = await this.http.get<User>(`${environment.baseApi}/auth/userprofile`).toPromise();
    if (user) {
      this.setProfileData(user);
    }
    return true;
  }

  verifyOtp(otp) {
    return this.http.get<boolean>(`${environment.baseApi}/auth/otp?username=${otp.username}&code=${otp.code}`).toPromise();
  }
  // isAuthorize(privilege: string) {
  //   if (!privilege) return true
  //   let privs = privilege.split("|")
  //   let res = intersection(this.currentUser.role.privileges, privs)
  //   return (res.length > 0)
  // }

}

export interface LoginParams {
  username: string;
  password: string;
  type: string;
}

export interface LoginResponse {
  username: string;
  token: string;
}