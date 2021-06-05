import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesDRoutingModule } from './clientes-d-routing.module';
import { ClientesDComponent } from './clientes-d.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ClientesDComponent],
  imports: [
    CommonModule,
    ClientesDRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class ClientesDModule { }
