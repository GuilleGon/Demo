import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authSvc: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.url.includes('users')) {
      const userValue = JSON.parse(localStorage.getItem('user'));
      if(userValue != null){const authReq = req.clone({
        setHeaders: {
          auth: userValue.token
        },
      });
      return next.handle(authReq);
    }}
    return next.handle(req);
  }
}
