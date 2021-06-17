import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee/employee';
import { RegistrationService } from '../registration.service';
import { SkillsService } from '../skills.service';
import { Skill } from '../skills/Skill';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  employeeLists: Employee[] = [];
  EmployeeDataList = [];
  SkillList: Skill[] = [];
  EmpID = 0;
  totalAngularPackages: any;
  constructor(
    private employeeData: RegistrationService,
    private skillsData: SkillsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getEmployees();
    this.getSkills();
  }
  getSkills(): void {
    this.skillsData.getDbSkills().subscribe(
      (Skills) => {
        this.SkillList = Skills.map((skill) => {
          return {
            SkillID: skill.SkillID,
            SkillName: skill.SkillName,
          };
        });
      },
      (err) => console.log(err)
    );
  }

  getEmployees(): void {
    this.employeeData.getDBEmployees().subscribe(
      (employees) => {
        this.employeeLists = employees.map((employee) => {
          return {
            EmpID: employee.EmpID,
            Name: employee.Name,
            LastName: employee.LastName,
            Birthdate: employee.Birthdate,
            Skills: employee.Skills,
          };
        });
      },
      (err) => console.log(err)
    );
  }

  getAge(date: any) {
    return this.employeeData.getAge(date);
  }
  btnClick() {
    this.router.navigateByUrl('/employee-edit/{{this.employeeLists}}');
  }

  getSkillName(id: number): string {
    const skill = this.SkillList.filter((skill) => skill.SkillID == id);
    return skill[0]?.SkillName;
  }
  btnRemove(employeeID: number): void {
    this.EmpID = employeeID;
    this.NotificationYN = 'Are you sure you want to remove this data?';
    this.showToastNotifYN();
  }
  btnRemoveYes() {
    this.employeeData.deleteDBEmployee(this.EmpID).subscribe(
      (res) => console.log(res),
      (err) => console.log(err),
      () => {
        this.getEmployees();
        document.getElementById('modalCloseBtn')?.click();
      }
    );
    this.showToastYN = false;
  }
  btnRemoveCancel() {
    this.getEmployees();
    this.showToastYN = false;
  }

  NotificationYN = '';
  showToastYN = false;

  showToastNotifYN() {
    this.showToastYN = true;
  }
}
