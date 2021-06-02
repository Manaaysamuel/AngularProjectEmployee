import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeComponent} from './employee/employee.component';
import {HomeComponent} from './home/home.component';
import{SkillsComponent} from './skills/skills.component';
const routes: Routes = [
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"employee",
    component:EmployeeComponent
  },
  {
    path:"skills",
    component:SkillsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
