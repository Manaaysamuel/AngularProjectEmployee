import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { Employee } from '../employee/employee';
import { RegistrationService } from '../registration.service';
import {FormControl} from '@angular/forms';



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
        Skills: this.fb.array([])
      })
  }
  getEmployees() : void {
    this.employeeLists = this.employeeData.getEmployees();
  }
  getSkills() : void {
    this.skillGroup = this.skillData.getSkills();
  }

  submit(): void {
    console.log(this.employeeForm)
  let employee = this.employeeForm?.value;

  let datainfo : Employee = {
    EmpID: employee.EmpID,
    Name: employee.Name,
    LastName: employee.LastName,
    Birthdate: employee.Birthdate,
    Skills: employee.Skills,
  }
  this.employeeData.setEmployee(datainfo);
  this.employeeForm = this.formBuilder();
  document.getElementById("EmpID")?.focus();
  window.alert("New Employee has been successfully added");
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
  getSkillID(selectedSkill : boolean[]){
    var ids : number[] = [];
    this.skillGroup.forEach((value, index)=>{
      if(selectedSkill[index]){
        ids.push(value.SkillID);
      }
    });
    return ids;
  }
  
}
