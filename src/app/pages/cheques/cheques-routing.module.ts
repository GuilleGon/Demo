import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChequesComponent } from './cheques.component';

const routes: Routes = [{ path: '', component: ChequesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChequesRoutingModule { }
