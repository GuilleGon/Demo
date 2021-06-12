import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gastos } from '@app/shared/models/gastos';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GastosServiceService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Gastos[]> {
    return this.http.get<Gastos[]>(`${environment.API}/gastos`);
  }

  public getById(id: string): Observable<Gastos> {
    return this.http.get<Gastos>(`${environment.API}/gastos/${id}`);
  }

  public newGasto(gasto: Gastos) {
    return this.http.post<Gastos>(`${environment.API}/gastos`, gasto);
  }

  public updateGasto(gasto: Gastos) {
    return this.http.patch<Gastos>(`${environment.API}/gastos/${gasto.id}`, gasto);
  }

  public deleteGasto(id: string){
    return this.http.delete<Gastos>(`${environment.API}/gastos/${id}`);
  }
}
