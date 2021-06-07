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
  
  // EmpID : number = 1;
  // employeeLists : Employee[] = [];
  // skillGroup : Skill[] = [];
  // skills = new FormControl();
  // FName : string = "";
  // LName : string = "";
  // Bday = new Date();


  // employeeForm= this.InitializeData();
  

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
 
    // const getID = this.router.url.split('/')[2];
    // console.log(getID);
    // var EmpData = JSON.parse(localStorage.getItem('data') || '{}');
    // var EmployeeDatas =  EmpData.filter(function(Employee: { EmpID: string; }) {
    //   return Employee.EmpID == getID;
    // })
    //  this.FName = EmployeeDatas.Name;
    //  this.LName = EmployeeDatas.LastName;
    //  this.Bday = EmployeeDatas.Birthdate;
    
 


    // this.getEmployees();
    this.getSkills();
    // this.getEmployeeData();



    // this.employeeForm = this.InitializeData();
    // console.log(this.employeeForm);
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
        birthdate : this.employee?.Birthdate
      });    

      console.log(this.employee)
    //   this.skillGroup.forEach((skill)=>{
    //     if(employee.skills.findIndex(sk=>skill.id===sk) >= 0){
    //       this.skills.push(this.formBuilder.control(true));
    //     }else{
    //       this.skills.push(this.formBuilder.control(false));
    //     }
    //   });
    // });
  }

  updateChange() : void {
    let employee = this.employeeForm.value;
    let data : Employee = {
      EmpID: employee.EmpID,
      Name: employee.Name,
      LastName: employee.LastName,
      Birthdate: employee.Birthdate,
      Skills: []
      // skills: this.getSkillID(employee.skills)
    }
    this.employeeData.updateEmployee(data);
    document.getElementById("modalCloseBtn")?.click();
  }
  getEmployeeData(){
  //   const getID = this.router.url.split('/')[2];
  //   console.log(getID);
  //   var EmpData = JSON.parse(localStorage.getItem('data') || '{}');
  //   var Data =  EmpData.filter(function(Employee: { EmpID: string; }) {
  //     return Employee.EmpID == getID;
  // })
  // console.log(Data);
  }


  InitializeData() {

  //   const getID = this.router.url.split('/')[2];

  //   var EmpData = JSON.parse(localStorage.getItem('data') || '{}');
  //   var EmployeeData =  EmpData.filter(function(Employee: { EmpID: string; }) {
  //     return Employee.EmpID == getID;
  // })

  }

  

  getEmployees() : void {
    // const getID = this.router.url.split('/')[2];
    // console.log(getID);
    // var EmpData = JSON.parse(localStorage.getItem('data') || '{}');
    // var EmployeeDatas =  EmpData.filter(function(Employee: { EmpID: string; }) {
    //   return Employee.EmpID == getID;
    // })
    // this.employeeLists = EmployeeDatas;
 
  }
  getSkills() : void {
     this.skillGroup = this.skillData.getSkills();
  }

  submit():void{
    // this.employeeForm = this.InitializeData();
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

  // get skills() {
  //   return this.employeeForm.get("skills") as FormArray;
  // }
 

}
