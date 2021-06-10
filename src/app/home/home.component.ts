import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee/employee';
import { RegistrationService } from '../registration.service';
import { SkillsService } from '../skills.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  employeeLists: Employee[] = [];
  EmployeeDataList = [];
  constructor(
    private employeeData: RegistrationService,
    private skillsData: SkillsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees(): void {
    this.employeeLists = this.employeeData.getEmployees();
  }
  getAge(date: any) {
    return this.employeeData.getAge(date);
  }
  btnClick() {
    this.router.navigateByUrl('/employee-edit/{{this.employeeLists}}');
  }
  getSkillName(id: number) {
    return this.skillsData.getSkillName(id);
  }
  btnRemove(employeeID: number): void {
    this.EmployeeDataList = JSON.parse(localStorage.getItem('data') || '{}');
    this.NotificationYN = 'Are you sure you want to remove this data?';
    this.showToastNotifYN();
    this.EmployeeDataList = this.EmployeeDataList.filter(
      (Employee: { EmpID: number }) => Employee.EmpID != employeeID
    );
  }
  btnRemoveYes() {
    console.log('yes');
    window.localStorage['data'] = JSON.stringify(this.EmployeeDataList);
    this.getEmployees();
    this.showToastYN = false;
  }
  btnRemoveCancel() {
    this.getEmployees();
    console.log('NO');
    this.showToastYN = false;
  }

  NotificationYN = '';
  showToastYN = false;

  showToastNotifYN() {
    this.showToastYN = true;
  }
}
