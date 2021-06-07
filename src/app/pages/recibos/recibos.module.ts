import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecibosRoutingModule } from './recibos-routing.module';
import { RecibosComponent } from './recibos.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [RecibosComponent],
  imports: [
    CommonModule,
    RecibosRoutingModule,
    MaterialModule,
  ]
})
export class RecibosModule { }
