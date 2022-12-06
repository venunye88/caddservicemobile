import { HttpInterceptor, HttpEvent, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { ToasterService } from './shared/shared/toaster.service';
import { StoreKeys } from './shared/shared/config-keys';
import { flatten, values } from 'underscore';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private toast: ToasterService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

    const token: string = localStorage.getItem(StoreKeys.Token);
    let authReq = req.clone();
    if (token) {
      authReq = req.clone({ setHeaders: { Authorization: `Bearer ${atob(token)}` } });
    }

    return next.handle(authReq).pipe(
      tap((response: HttpResponse<any>) => {
        switch (response.status) {
          case 201: //created
            this.toast.showBanner("Data saved successfully.", false);
            break;
          case 209: //Transaction Reversed
            this.toast.showBanner("Reversed Transaction successful.", false);
            break;
          case 200: //success
            switch (req.method) {
              case 'PUT':
                this.toast.showBanner("Data updated successfully.", false);
                break;
              case 'DELETE':
                this.toast.showBanner("Data deleted successfully.", false);
                break;
              default:
                // this.toast.hideToast();
                break;
            }
          default:
            break;
        }
        if (response.status === 200 && req.method != 'GET' && !response.url.endsWith('query')) {
          // console.log(response)
          // Toast.success(response.body.success);
        }
      }, err => {
        switch (err.status) {
          case 401: //Unauthorized
            const isLogin = this.authService.isLoggedIn();
            if (isLogin) {
              setTimeout(() => {
                this.toast.error("Session expired. Please login");
                this.authService.logout();
                location.reload();
              }, 400);
            } else {
              this.toast.error(err.error);
            }
            break;
          case 403: //Forbiden
            this.toast.error("You are not authorized to perform this action. Contact your administrator.");
            break;
          case 400: //Bad Request
            this.toast.error(this.refactorError(err));
            break;
          case 404:
            this.toast.error("Resource doesn't exist.");
            break;
          case 500: //Internal Server Error
            this.toast.error(err.error);
            break;
          default:
            this.toast.error(err.statusText);
            break;
        }
      })
    )


  }

  private refactorError(err: any): string {
    if (err.error) {
      if (err.error.errors) {
        let errors: string[] = flatten(values(err.error.errors))
        return errors.join('\n')
      } else {
        return err.error;
      }
    }
    else if (err.message) return err.message;
  }

}