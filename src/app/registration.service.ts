import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from './employee/employee';
import { Employees } from './employee/employees';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  getEmployees(): Employee[] {
    return Employees();
  }

  setEmployee(employee: Employee): void {
    let employees = this.getEmployees();
    employees.push(employee);
    window.localStorage.setItem('data', JSON.stringify(employees));
  }
  getAge(date: any): number {
    let dateToday = new Date();
    let getDate = new Date(date);
    var dateResult = Math.abs(
      new Date(dateToday.getTime() - getDate.getTime()).getUTCFullYear() - 1970
    );
    return dateResult;
  }
  convrtDate(date: any): number {
    var newdate = date.split('-').reverse().join('-');
    return newdate;
  }
  updateEmployee(employee: Employee): void {
    var EmployeeData = JSON.parse(localStorage.data);
    for (var i = 0; i < EmployeeData.length; i++) {
      if (employee.EmpID == EmployeeData[i].EmpID) {
        EmployeeData[i].Name = employee.Name;
        EmployeeData[i].LastName = employee.LastName;
        EmployeeData[i].Birthdate = employee.Birthdate;
        EmployeeData[i].Skills = employee.Skills.slice(-1)[0];
        break;
      }
    }

    localStorage.setItem('data', JSON.stringify(EmployeeData));
  }
}
