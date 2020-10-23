import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreschoolComponent } from './preschools/preschool.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PreschoolDetailComponent } from './preschool-detail/preschool-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreschoolFormComponent } from './preschool-form/preschool-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiscountComponent } from './discount/discount.component';
import { DiscountDetailComponent } from './discount-detail/discount-detail.component';
import { DiscountFormComponent } from './discount-form/discount-form.component';


import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    PreschoolComponent,
    PreschoolDetailComponent,
    PreschoolFormComponent,
    DashboardComponent,
    DiscountComponent,
    DiscountDetailComponent,
    DiscountFormComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatListModule,
    MatGridListModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
