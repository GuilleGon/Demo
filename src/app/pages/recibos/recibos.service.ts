import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recibo } from '@app/shared/models/recibos';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecibosService {

  constructor(private http: HttpClient,) { }

  public getAllReciboD(): Observable<Recibo[]> {
    return this.http.get<Recibo[]>(`${environment.API}/recibos`);
  }

  public getReciboById(id: string): Observable<Recibo> {
    return this.http.get<Recibo>(`${environment.API}/recibos/${id}`);
  }

  public newRecibo(recibo: Recibo) {
    return this.http.post<Recibo>(`${environment.API}/recibos`, recibo);
  }

  public updateRecibo(recibo: Recibo) {
    return this.http.patch<Recibo>(`${environment.API}/recibos/${recibo.id}`, recibo);
  }

  public deleteRecibo(id: string){
    return this.http.delete<Recibo>(`${environment.API}/recibos/${id}`);
  }
  
}
