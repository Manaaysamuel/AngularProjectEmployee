import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Employee } from '../employee/employee';
import { RegistrationService } from '../registration.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
  EmpID : number = 1;
  employeeLists : Employee[] = [];  
  employeeForm= this.formBuilder();
  constructor(
    private fb:FormBuilder,
    private employeeData : RegistrationService
    ) { }

  ngOnInit(): void {
    this.getEmployees();
    this.employeeForm = this.formBuilder();
    // LastValue = JSON.parse(localStorage.getItem('data') || '[]');
    // GetEmpID = LastValue.pop()?.id;
    // EmpID = GetEmpID == undefined || null ? GetEmpID = 1 : GetEmpID + 1
    // console.log(EmpID);
    // this.employeeForm = this.fb.group({
    //   EmpID: EmpID,
    //   Name: '',
    //   LastName:'',
    //   Birthdate:'',
    // })
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
