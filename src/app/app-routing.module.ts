import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreschoolDetailComponent } from './preschool-detail/preschool-detail.component';
import { PreschoolComponent } from './preschools/preschool.component';

const routes: Routes = [
  { path: 'preschools', component: PreschoolComponent },
  { path: 'preschools/:id', component: PreschoolDetailComponent },
  { path: '', redirectTo: '/preschools', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
