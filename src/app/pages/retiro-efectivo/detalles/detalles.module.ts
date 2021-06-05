import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetallesRoutingModule } from './detalles-routing.module';
import { DetallesComponent } from './detalles.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DetallesComponent],
  imports: [
    CommonModule,
    DetallesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class DetallesModule { }
