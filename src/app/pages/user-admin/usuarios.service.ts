import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetail } from '@app/shared/models/user.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }


  public getAllUsuarios(): Observable<UserDetail[]> {
    return this.http.get<UserDetail[]>(`${environment.API}/users`);
  }

  public getUserById(id: string): Observable<UserDetail> {
    const header = JSON.parse(localStorage.getItem('user'));
    return this.http.get<UserDetail>(`${environment.API}/users/${id}`, {headers: header});
  }

  public newUser(user: UserDetail) {
    return this.http.post<UserDetail>(`${environment.API}/users`, user);
  }

  public updateUser(user: UserDetail) {
    return this.http.patch<UserDetail>(`${environment.API}/users/${user.id}`, user);
  }

  public deleteUser(id: string) {
    return this.http.delete<UserDetail>(`${environment.API}/users/${id}`);
  }

}
