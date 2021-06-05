import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteDetalle } from '@app/shared/models/client.interfase';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'any'
})
export class ClientesService {

  constructor(private http: HttpClient,) { }

  public getAllClientD(): Observable<ClienteDetalle[]> {
    return this.http.get<ClienteDetalle[]>(`${environment.API}/clients`);
  }

  public getClientById(id: string): Observable<ClienteDetalle> {
    return this.http.get<ClienteDetalle>(`${environment.API}/clients/${id}`);
  }

  public newClient(client: ClienteDetalle) {
    return this.http.post<ClienteDetalle>(`${environment.API}/clients`, client);
  }

  public updateClient(client: ClienteDetalle) {
    return this.http.patch<ClienteDetalle>(`${environment.API}/clients/${client.id}`, client);
  }

  public deleteClient(id: string){
    return this.http.delete<ClienteDetalle>(`${environment.API}/clients/${id}`);
  }


}
