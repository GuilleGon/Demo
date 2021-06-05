import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevouComponent } from './nuevou.component';

const routes: Routes = [{ path: '', component: NuevouComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevouRoutingModule { }
