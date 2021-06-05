import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuevouRoutingModule } from './nuevou-routing.module';
import { NuevouComponent } from './nuevou.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NuevouComponent],
  imports: [
    CommonModule,
    NuevouRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class NuevouModule { }
