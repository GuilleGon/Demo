import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Presuspuestos } from '@app/shared/models/presupuestos';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChequesService {

  constructor(private http: HttpClient) { }


}
