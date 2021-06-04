import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee/employee';
import { RegistrationService } from '../registration.service';
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
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees() : void {
    this.employeeLists = this.employeeData.getEmployees();
  }
  getAge(date:any){
    return this.employeeData.getAge(date);
  }
  btnClick () {

        this.router.navigateByUrl("/employee-edit/{{this.employeeLists}}");
};
}
