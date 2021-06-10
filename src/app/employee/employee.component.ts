import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Employee } from '../employee/employee';
import { RegistrationService } from '../registration.service';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';

import { Skill } from '../skills/Skill';
import { SkillsService } from '../skills.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  EmpID: number = 1;
  employeeLists: Employee[] = [];
  skillGroup: Skill[] = [];
  skills = new FormControl();
  newdata = [];

  phases = new FormControl();
  employeeForm = this.InitializeData();
  constructor(
    private fb: FormBuilder,
    private employeeData: RegistrationService,
    private skillData: SkillsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSkills();
    this.getEmployees();
    this.employeeForm = this.InitializeData();
    this.skills.valueChanges.subscribe((data) => {
      this.employeeForm?.value.Skills.push(data);
      var data = this.employeeForm?.value.Skills;
      const obj = data[data.length - 1];
      this.newdata = obj.map((i: any) => Number(i));
    });
  }

  InitializeData() {
    var EmployeeData = JSON.parse(localStorage.getItem('data') || '{}');
    for (
      var EmpLastValArray = EmployeeData[EmployeeData.length - 1];
      EmpLastValArray >= 0;

    );
    return this.fb.group({
      EmpID: [EmpLastValArray.EmpID + 1],
      Name: [''],
      LastName: [''],
      Birthdate: [''],
      Skills: this.fb.array([]),
    });
  }
  getEmployees(): void {
    this.employeeLists = this.employeeData.getEmployees();
  }
  getSkills(): void {
    this.skillGroup = this.skillData.getSkills();
  }
  get skillsinfo() {
    return this.employeeForm?.get('skills') as FormArray;
  }
  submit(): void {
    let employee = this.employeeForm?.value;
    let datainfo: Employee = {
      EmpID: employee.EmpID,
      Name: employee.Name,
      LastName: employee.LastName,
      Birthdate: employee.Birthdate,
      Skills: this.newdata,
    };
    this.employeeData.setEmployee(datainfo);
    this.employeeForm = this.InitializeData();
    document.getElementById('EmpID')?.focus();
    this.Notification = 'Employee has successfully been created!';
    this.showToastNotif();
  }
  getSkillName(id: number) {
    return this.skillData.getSkillName(id);
  }
  getSkillID(selectedSkill: boolean[]) {
    var ids: number[] = [];
    this.skillGroup.forEach((value, index) => {
      if (selectedSkill[index]) {
        ids.push(value.SkillID);
      }
    });
    return ids;
  }
  returnToPrevPage(): void {
    this.location.back();
  }

  showToast = false;
  Notification = '';

  showToastNotif() {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.returnToPrevPage();
    }, 1000);
  }
}
