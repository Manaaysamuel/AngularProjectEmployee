import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { Employee } from '../employee/employee';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import{Skill} from '../skills/Skill';
import {SkillsService} from '../skills.service';
import {FormControl} from '@angular/forms';

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
    Skills : this.fb.array([])
  });
  skillGroup : Skill[] = [];
  skills = new FormControl();
  newdata = [];
  newdataconverted = [];


  constructor(
    private fb:FormBuilder,
    private employeeDataService : RegistrationService,
    private skillData :SkillsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEmployee();
    this.getSkills();
    this.skills.valueChanges.subscribe(data => {
    var datav2 = [];
    datav2.push(data);
    
   
     const obj  = datav2[datav2.length - 1]
     console.log(obj)
     this.newdata = obj.map((i: any)=>Number(i));
     console.log(this.newdata)
     this.employeeForm?.value.Skills.push(this.newdata);
    });
  }


  getEmployee(){
    const getID = this.router.url.split('/')[2];
    var EmpData = JSON.parse(localStorage.getItem('data') || '{}');
    var EmployeeDatas =  EmpData.filter(function(Employee: { EmpID: string; }) {
      return Employee.EmpID == getID;
    })

    this.employee = EmployeeDatas[0];
      this.employeeForm.patchValue({
        EmpID : this.employee?.EmpID,
        Name : this.employee?.Name,
        LastName : this.employee?.LastName,
        Birthdate : this.employee?.Birthdate,
        Skills : this.newdata
      }); 
    }
    
    updateEmployee() : void {
      let employee = this.employeeForm.value;
      console.log(employee)
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
    getSkills() : void {
      this.skillGroup = this.skillData.getSkills();
      console.log(this.skillGroup)
    }
   getSkillName(id : number){
    return this.skillData.getSkillName(id);
  }
}
