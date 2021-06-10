import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { SkillsComponent } from './skills/skills.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { SkillseditComponent } from './skillsedit/skillsedit.component';
import { SkillshomepageComponent } from './skillshomepage/skillshomepage.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'employee',
    component: EmployeeComponent,
  },
  {
    path: 'skills',
    component: SkillsComponent,
  },
  {
    path: 'edit-employee/:id',
    component: EditEmployeeComponent,
  },
  {
    path: 'edit-skills/:id',
    component: SkillseditComponent,
  },
  {
    path: 'skillhomepage',
    component: SkillshomepageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
