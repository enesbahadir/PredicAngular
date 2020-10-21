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

@NgModule({
  declarations: [
    AppComponent,
    PreschoolComponent,
    PreschoolDetailComponent,
    PreschoolFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
