import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { Employee } from '../employee/employee';
import { RegistrationService } from '../registration.service';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import{Skill} from '../skills/Skill';
import { ActivatedRoute } from '@angular/router';
import {SkillsService} from '../skills.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})

export class EmployeeEditComponent implements OnInit {
  employee : Employee | undefined;
  employeeForm = this.fb.group({
    employeeID : [''],
    firstName : [''],
    lastName : [''],
    birthdate : ['0000-00-00'
    ],
    skills : this.fb.array([])
  });
  skillGroup : Skill[] = [];
  newdata = [];
  skills = new FormControl();

  constructor(
    private fb:FormBuilder,
    private location : Location,
    private activatedRoute : ActivatedRoute,
    private employeeData : RegistrationService,
    private skillData :SkillsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEmployee();
    this.getSkills();
    this.getSkills();

    this.skills.valueChanges.subscribe(data => {
    this.employeeForm?.value.Skills.push(data);
    var data = this.employeeForm?.value.Skills
     const obj  = data[data.length - 1]
     this.newdata = obj.map((i: any)=>Number(i));

    });
  }

  getEmployee(){
    const getID = this.router.url.split('/')[2];
    var EmpData = JSON.parse(localStorage.getItem('data') || '{}');
    var EmployeeDatas =  EmpData.filter(function(Employee: { EmpID: string; }) {
      return Employee.EmpID == getID;
    })
    this.employee = EmployeeDatas;
      this.employeeForm.patchValue({
        employeeID : this.employee?.EmpID,
        firstName : this.employee?.Name,
        lastName : this.employee?.LastName,
        birthdate : this.employee?.Birthdate,
        skills : this.employee?.Skills
      });    

      console.log(this.employee)
  }

  updateChange() : void {
    let employee = this.employeeForm.value;
    let data : Employee = {
      EmpID: employee.EmpID,
      Name: employee.Name,
      LastName: employee.LastName,
      Birthdate: employee.Birthdate,
      Skills: []
    }
    this.employeeData.updateEmployee(data);
    document.getElementById("modalCloseBtn")?.click();
  }


  getSkills() : void {
     this.skillGroup = this.skillData.getSkills();
  }

  get fname() {
    return this.employeeForm.get("Name");
  }

  get lname() {
    return this.employeeForm.get("LastName");
  }

  get bdate() {
    return this.employeeForm.get("Birthdate");
  }


}
