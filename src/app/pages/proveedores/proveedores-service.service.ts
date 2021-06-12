import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedores } from '@app/shared/models/proveedores';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresServiceService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Proveedores[]> {
    return this.http.get<Proveedores[]>(`${environment.API}/proveedores`);
  }

  public getById(id: string): Observable<Proveedores> {
    return this.http.get<Proveedores>(`${environment.API}/proveedores/${id}`);
  }

  public newProvedoores(proveedores: Proveedores) {
    return this.http.post<Proveedores>(`${environment.API}/proveedores`, proveedores);
  }

  public updateProvedoores(proveedores: Proveedores) {
    return this.http.patch<Proveedores>(`${environment.API}/proveedores/${proveedores.id}`, proveedores);
  }

  public deleteProvedoores(id: string){
    return this.http.delete<Proveedores>(`${environment.API}/proveedores/${id}`);
  }
}
