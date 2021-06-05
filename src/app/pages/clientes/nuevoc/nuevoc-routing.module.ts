import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevocComponent } from './nuevoc.component';

const routes: Routes = [{ path: '', component: NuevocComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevocRoutingModule { }
