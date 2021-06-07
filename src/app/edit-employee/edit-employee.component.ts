import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { Employee } from '../employee/employee';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import{Skill} from '../skills/Skill';
import { ActivatedRoute } from '@angular/router';
import {SkillsService} from '../skills.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employee :  Employee | undefined;
  employeeForm = this.fb.group({
    EmpID : [''],
    Name : [''],
    LastName : [''],
    Birthdate : ['0000-00-00'
    ],
    skills : this.fb.array([])
  });
  skillGroup : Skill[] = [];



  constructor(
    private fb:FormBuilder,
    private location : Location,
    private activatedRoute : ActivatedRoute,
    private employeeDataService : RegistrationService,
    private skillData :SkillsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEmployee();
    // this.getSkills();
  }
  getEmployee(){
    const getID = this.router.url.split('/')[2];
    var EmpData = JSON.parse(localStorage.getItem('data') || '{}');
    var EmployeeDatas =  EmpData.filter(function(Employee: { EmpID: string; }) {
      return Employee.EmpID == getID;
    })

    this.employee = EmployeeDatas[0];
    console.log(this.employee)
      this.employeeForm.patchValue({
        EmpID : this.employee?.EmpID,
        Name : this.employee?.Name,
        LastName : this.employee?.LastName,
        Birthdate : this.employee?.Birthdate
      }); 
    }
    
    updateEmployee() : void {
      let employee = this.employeeForm.value;

      console.log(employee)
      // let data : Employee = {
      //   EmpID: employee.EmpID,
      //   Name: employee.Name,
      //   LastName: employee.LastName,
      //   Birthdate: employee.Birthdate,
      //   Skills: []
      // }
      this.employeeDataService.updateEmployee(employee);
      window.alert("This Employee has been successfully updated");
      window.location.reload();
     
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
