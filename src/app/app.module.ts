import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { SkillsComponent } from './skills/skills.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import  {ReactiveFormsModule} from '@angular/forms';
import  {MatInputModule} from '@angular/material/input';
import  {MatSelectModule} from '@angular/material/select';
import  {MatButtonModule} from '@angular/material/button';
import  {MatCheckboxModule} from '@angular/material/checkbox';
import  {MatChipsModule} from '@angular/material/chips';
import {MatToolbarModule} from '@angular/material/toolbar'
// import  {} from;


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    SkillsComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatToolbarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
