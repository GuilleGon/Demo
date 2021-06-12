import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse, User, Roles } from '@shared/models/user.interface';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new BehaviorSubject<UserResponse>(null);

  get user$(): Observable<UserResponse> {
    return this.user.asObservable();
  }

  get userValue(): UserResponse {
    return this.user.getValue()
  }




  private role = new BehaviorSubject<Roles>(null);
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get isAdmin$(): Observable<string> {
    return this.role.asObservable();
  }


  login(authData: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${environment.API}/auth/login`, authData).pipe(
      map((res: UserResponse) => {
        this.saveTokenRole(res);
        this.loggedIn.next(true);
        this.role.next(res.role);
        return res;
      }),
      catchError((err) => this.handlerError(err))
    );

  }


  logout(): void {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }


  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user')) || null;

    if (user) {
      const isExpired = helper.isTokenExpired(user.token);

      if (isExpired) {
        this.logout();
      } else {
        this.loggedIn.next(true);
        this.role.next(user.role);
      }
    }
    //isExpired ? this.logout() : this.loggedIn.next(true);
  }

  private saveTokenRole(user: UserResponse): void {
    const { id, message, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }


  private handlerError(err): Observable<never> {
    let errorMessage = "An error ocurred retrieving data";
    if (err) {
      errorMessage = `CAMPOS NO VALIDOS, Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


}
