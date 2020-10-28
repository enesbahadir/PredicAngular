import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiscountDetailComponent } from './discount-detail/discount-detail.component';
import { DiscountComponent } from './discount/discount.component';
import { LoginComponent } from './login/login.component';
import { PreschoolDetailComponent } from './preschool-detail/preschool-detail.component';
import { PreschoolComponent } from './preschools/preschool.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'preschools', component: PreschoolComponent, canActivate: [AuthGuard]  },
  { path: 'preschools/:id', component: PreschoolDetailComponent, canActivate: [AuthGuard]  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'discounts', component: DiscountComponent, canActivate: [AuthGuard]  },
  { path: 'discounts/:id', component: DiscountDetailComponent, canActivate: [AuthGuard]  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
