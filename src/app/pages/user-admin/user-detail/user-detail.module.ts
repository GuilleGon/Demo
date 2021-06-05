import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailRoutingModule } from './user-detail-routing.module';
import { UserDetailComponent } from './user-detail.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserDetailComponent],
  imports: [
    CommonModule,
    UserDetailRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class UserDetailModule { }
