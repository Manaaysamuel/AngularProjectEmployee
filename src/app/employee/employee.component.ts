import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Employee } from '../employee/employee';
import { RegistrationService } from '../registration.service';
import {FormControl} from '@angular/forms';

import { IDropdownSettings } from 'ng-multiselect-dropdown';

import{Skill} from '../skills/Skill';
import {SkillsService} from '../skills.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
  EmpID : number = 1;
  employeeLists : Employee[] = [];  
  skillGroup : Skill[] = [];
  skills = new FormControl();
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  employeeForm= this.formBuilder();
  constructor(
    private fb:FormBuilder,
    private employeeData : RegistrationService,
    private skillData :SkillsService
    ) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getSkills();
    this.employeeForm = this.formBuilder();

  }
  formBuilder() {

    for(;this.employeeLists.findIndex(emp=>emp.EmpID===this.EmpID) > -1; this.EmpID++);

    return this.fb.group({
        EmpID : [this.EmpID],
        Name: [''],
        LastName: [''],
        Birthdate: [''],
      })
  }
  getEmployees() : void {
    this.employeeLists = this.employeeData.getEmployees();
  }
  getSkills() : void {
    this.skillGroup = this.skillData.getSkills();
  }

  submit(): void {
  let employee = this.employeeForm?.value;
  let datainfo : Employee = {
    EmpID: employee.EmpID,
    Name: employee.Name,
    LastName: employee.LastName,
    Birthdate: employee.Birthdate,
  }
  this.employeeData.setEmployee(datainfo);
  this.employeeForm = this.formBuilder();
  document.getElementById("EmpID")?.focus();
  window.location.reload();
    // var new_data = (this.employeeForm?.value);
    // console.log(new_data);
    // console.log(JSON.stringify(this.employeeForm?.value));
    // if(localStorage.getItem('data') == null){
    //   localStorage.setItem('data','[]');
    // }
    // var old_data = JSON.parse(localStorage.getItem('data') || '{}');
    
    // old_data.push(new_data);
    // localStorage.setItem('data',JSON.stringify(old_data));

    

  }
  
  
}
