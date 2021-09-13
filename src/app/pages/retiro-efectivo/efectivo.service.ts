import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Retiro } from '@app/shared/models/retiro.interface';
import { RetiroE } from 'login_roles/src/entity/RetiroE';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EfectivoService {

  constructor(private http: HttpClient) { }

  public getAllRetiros(): Observable<Retiro[]> {
    return this.http.get<Retiro[]>(`${environment.API}/retiro`);
  }

  public getById(id: string): Observable<Retiro> {
    return this.http.get<Retiro>(`${environment.API}/retiro/${id}`);
  }

  public crearRetiro(retiro: RetiroE) {
    return this.http.post<RetiroE>(`${environment.API}/retiro`, retiro);
  }

  public editarRetiro(retiro: Retiro) {
    return this.http.patch<Retiro>(`${environment.API}/retiro/${retiro.id}`, retiro);
  }

  public borrarRetiro(id: string) {
    return this.http.delete<Retiro>(`${environment.API}/retiro/${id}`);
  }
}
