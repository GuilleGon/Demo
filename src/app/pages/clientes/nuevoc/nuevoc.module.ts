import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuevocRoutingModule } from './nuevoc-routing.module';
import { NuevocComponent } from './nuevoc.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NuevocComponent],
  imports: [
    CommonModule,
    NuevocRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class NuevocModule { }
