import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee/employee';
import { RegistrationService } from '../registration.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employeeLists : Employee[] = [];  
  constructor(
    private employeeData : RegistrationService
  ) { }
  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees() : void {
    this.employeeLists = this.employeeData.getEmployees();
  }
}
