import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChequesRoutingModule } from './cheques-routing.module';
import { ChequesComponent } from './cheques.component';
import { MaterialModule } from '@app/material.module';


@NgModule({
  declarations: [ChequesComponent],
  imports: [
    CommonModule,
    ChequesRoutingModule,
    MaterialModule
  ]
})
export class ChequesModule { }
