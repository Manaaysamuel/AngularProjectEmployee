import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Employee} from './employee/employee';
import { Employees } from './employee/employees';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor() { }

  getEmployees() : Employee[] { 
    return Employees();
  }

  setEmployee(employee : Employee) : void {
    let employees = this.getEmployees();
    employees.push(employee);
    window.localStorage.setItem("data",JSON.stringify(employees));
  }
  

}
