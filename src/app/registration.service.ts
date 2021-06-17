import { Injectable } from '@angular/core';
import { Employee } from './employee/employee';
import { Employees } from './employee/employees';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  employee_url: string = 'http://localhost:3000/employee/';
  constructor(private http: HttpClient) {}
  APIEmployees = new Array();

  //============================================================//
  //                    Get EMPLOYEE                            //

  getEmployees(): Employee[] {
    return Employees();
  }

  getDBEmployees() {
    return this.http.get<Employee[]>(this.employee_url, {
      responseType: 'json',
    });
  }

  getDBEmployee(id: number) {
    return this.http.get<Employee>(this.employee_url + id, {
      responseType: 'json',
    });
  }

  //============================================================//

  //============================================================//
  //                    Delete EMPLOYEE                        //
  deleteDBEmployee(id: number) {
    return this.http.delete<string>(this.employee_url + id, {
      responseType: 'json',
    });
  }

  //============================================================//

  //============================================================//
  //                    ADD EMPLOYEE                            //
  postDBEmployee(employee: Employee) {
    const bodyRequest = {
      Name: employee.Name,
      LastName: employee.LastName,
      Birthdate: employee.Birthdate,
      Skills: employee.Skills.length > 0 ? employee.Skills.join(',') : null,
    };
    return this.http.post<string>(this.employee_url, bodyRequest, {
      responseType: 'json',
    });
  }

  //============================================================//

  //============================================================//
  //                    UTILS EMPLOYEE                          //
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

  empNextID() {
    return this.http.get<number>(this.employee_url + 'next_id', {
      responseType: 'json',
    });
  }

  getHtml() {
    this.http
      .get(this.employee_url)
      .subscribe((response) => console.log(response));
  }

  //============================================================//

  //============================================================//
  //                    EDIT EMPLOYEE                            //
  updateDbEmployee(employee: Employee) {
    const bodyRequest = {
      Name: employee.Name,
      LastName: employee.LastName,
      Birthdate: employee.Birthdate,
      Skills: employee.Skills.length > 0 ? employee.Skills.join(',') : null,
    };

    return this.http.put<string>(
      this.employee_url + employee.EmpID,
      bodyRequest,
      {
        responseType: 'json',
      }
    );
  }
}

//============================================================//
