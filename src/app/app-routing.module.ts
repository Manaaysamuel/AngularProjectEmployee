import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeComponent} from './employee/employee.component';
import {HomeComponent} from './home/home.component';
import{SkillsComponent} from './skills/skills.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';
import {SkillseditComponent} from './skillsedit/skillsedit.component';
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
  {
    path:"employee-edit/:id",
    component:EmployeeEditComponent
  },
  {
    path:"edit-employee/:id",
    component:EditEmployeeComponent
  },
  {
    path:"edit-skills/:id",
    component:SkillseditComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
