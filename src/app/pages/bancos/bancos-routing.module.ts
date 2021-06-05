import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BancosComponent } from './bancos.component';

const routes: Routes = [{ path: '', component: BancosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancosRoutingModule { }
