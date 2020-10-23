import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiscountDetailComponent } from './discount-detail/discount-detail.component';
import { DiscountComponent } from './discount/discount.component';
import { PreschoolDetailComponent } from './preschool-detail/preschool-detail.component';
import { PreschoolComponent } from './preschools/preschool.component';

const routes: Routes = [
  { path: 'preschools', component: PreschoolComponent },
  { path: 'preschools/:id', component: PreschoolDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'discounts', component: DiscountComponent },
  { path: 'discounts/:id', component: DiscountDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
