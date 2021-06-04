import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { Employee } from '../employee/employee';
import { RegistrationService } from '../registration.service';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import{Skill} from '../skills/Skill';
import {SkillsService} from '../skills.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})

export class EmployeeEditComponent implements OnInit {

  EmpID : number = 1;
  employeeLists : Employee[] = [];
  skillGroup : Skill[] = [];
  skills = new FormControl();


  employeeForm= this.InitializeData();

  constructor(
    private fb:FormBuilder,
    private employeeData : RegistrationService,
    private skillData :SkillsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getSkills();
    // this.getEmployeeData();



    this.employeeForm = this.InitializeData();
    console.log(this.employeeForm);
  }
  getEmployeeData(){
    const getID = this.router.url.split('/')[2];
    console.log(getID);
    var EmpData = JSON.parse(localStorage.getItem('data') || '{}');

    var Data =  EmpData.filter(function(Employee: { EmpID: string; }) {
      return Employee.EmpID == getID;


  })
  console.log(Data);
  }


  InitializeData() {

    const getID = this.router.url.split('/')[2];
    console.log(getID);
    var EmpData = JSON.parse(localStorage.getItem('data') || '{}');
    var EmployeeData =  EmpData.filter(function(Employee: { EmpID: string; }) {
      return Employee.EmpID == getID;
  })
    this.employeeLists = EmployeeData;

    // for(
    //   ;this.employeeLists.findIndex(
    //     emp=>emp.EmpID===this.EmpID
    //     ) > -1; this.EmpID++);

    // return this.fb.group({
    //     EmpID : [this.EmpID],
    //     Name: EmployeeData.Name,
    //     LastName: EmployeeData.LastName,
    //     Birthdate: EmployeeData.Birthdate,
    //     Skills: this.fb.array([])
    //   })
  }
  getEmployees() : void {
    const getID = this.router.url.split('/')[2];
    console.log(getID);
    var EmpData = JSON.parse(localStorage.getItem('data') || '{}');
    var EmployeeDatas =  EmpData.filter(function(Employee: { EmpID: string; }) {
      return Employee.EmpID == getID;
    })
    this.employeeLists = EmployeeDatas;

  }
  getSkills() : void {
    this.skillGroup = this.skillData.getSkills();
  }

  submit():void{
    this.employeeForm = this.InitializeData();
  }
  // submit(): void {
 
  // let employee = this.employeeForm;
  // let datainfo : Employee = {
  //   EmpID: employee.controls.EmpID.value,
  //   Name: employee.controls.Name.value,
  //   LastName: employee.controls.LastName.value,
  //   Birthdate: employee.controls.Birthdate.value,
  //   Skills: employee.controls.Skills.value,
  // }
  // this.employeeData.setEmployee(datainfo);
  // this.employeeForm = this.InitializeData();
  // document.getElementById("EmpID")?.focus();
  // window.alert("New Employee has been successfully added");
  // window.location.reload();
  //   // var new_data = (this.employeeForm?.value);
  //   // console.log(new_data);
  //   // console.log(JSON.stringify(this.employeeForm?.value));
  //   // if(localStorage.getItem('data') == null){
  //   //   localStorage.setItem('data','[]');
  //   // }
  //   // var old_data = JSON.parse(localStorage.getItem('data') || '{}');

  //   // old_data.push(new_data);
  //   // localStorage.setItem('data',JSON.stringify(old_data));



  // }

}
