import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Presuspuestos } from '@app/shared/models/presupuestos';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {

  constructor(private http: HttpClient) { }


  public getAll(): Observable<Presuspuestos[]> {
    return this.http.get<Presuspuestos[]>(`${environment.API}/presupuesto`);
  }

  public getById(id: string): Observable<Presuspuestos> {
    return this.http.get<Presuspuestos>(`${environment.API}/presupuesto/${id}`);
  }

  public newPresu(presu: Presuspuestos) {
    return this.http.post<Presuspuestos>(`${environment.API}/presupuesto`, presu);
  }

  public updatePresu(presu: Presuspuestos) {
    return this.http.patch<Presuspuestos>(`${environment.API}/presupuesto/${presu.id}`, presu);
  }

  public deletePresu(id: string){
    return this.http.delete<Presuspuestos>(`${environment.API}/presupuesto/${id}`);
  }
}
