import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee/employee';
import { RegistrationService } from '../registration.service';
import {SkillsService} from '../skills.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employeeLists : Employee[] = [];  
  constructor(
    private employeeData : RegistrationService,
    private skillsData : SkillsService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getEmployees();
   
  }
  getEmployees() : void {
    this.employeeLists = this.employeeData.getEmployees();
    console.log(this.employeeLists);
  }
  getAge(date:any){
    return this.employeeData.getAge(date);
  }
  btnClick () {

        this.router.navigateByUrl("/employee-edit/{{this.employeeLists}}");
};
getSkillName(id : number){
  return this.skillsData.getSkillName(id);
}

btnRemove(employeeID : number) : void {
    var EmployeeData = JSON.parse(localStorage.getItem('data') || '{}');
  if (confirm("Are you sure you want to delete this data?")) {
    EmployeeData = EmployeeData.filter((Employee: { EmpID: number; }) => Employee.EmpID != employeeID);
    window.localStorage['data'] = JSON.stringify(EmployeeData);
    console.log(EmployeeData);
    window.location.reload();
  } else {
    window.location.reload();
  }
  }
}
