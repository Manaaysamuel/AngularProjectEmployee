import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Employee } from '../employee/employee';
import { RegistrationService } from '../registration.service';
import { Params, Router } from '@angular/router';
import { Skill } from '../skills/Skill';
import { Location } from '@angular/common';
import { SkillsService } from '../skills.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  employee: Employee | undefined;
  employeeForm = this.fb.group({
    EmpID: [''],
    Name: [''],
    LastName: [''],
    Birthdate: ['0000-00-00'],
    Skills: this.fb.array([]),
  });
  skillGroup: Skill[] = [];
  skills = new FormControl();
  EmployeeGroup = [];
  constructor(
    private fb: FormBuilder,
    private employeeDataService: RegistrationService,
    private skillData: SkillsService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getEmployee();
    this.getSkills();
    this.skills.valueChanges.subscribe((employeeData) => {
      var EmpCollection = new Array();
      EmpCollection.push(employeeData); //push the mapped data to array
      const EmployeeArray = EmpCollection[EmpCollection.length - 1]; //get the last value of array
      this.EmployeeGroup = EmployeeArray.map((i: any) => Number(i)); // convert array val to int
      this.employeeForm?.value.Skills.push(this.EmployeeGroup);
    });
  }

  getEmployee() {
    var EmpID = this.activatedRoute.snapshot.paramMap.get('id');
    var EmpData = JSON.parse(localStorage.getItem('data') || '{}');
    var EmployeeDatas = EmpData.filter(
      (Employee: { EmpID: string | null }) => Employee.EmpID == EmpID
    );

    this.employee = EmployeeDatas[0];
    this.employeeForm.patchValue({
      EmpID: this.employee?.EmpID,
      Name: this.employee?.Name,
      LastName: this.employee?.LastName,
      Birthdate: this.employee?.Birthdate,
      Skills: this.EmployeeGroup,
    });
  }

  updateEmployee(): void {
    let employee = this.employeeForm.value;
    this.employeeDataService.updateEmployee(employee);
    this.Notification = 'Employee has successfully been updated!';
    this.showToastNotif();
  }

  get fname() {
    return this.employeeForm.get('Name');
  }

  get lname() {
    return this.employeeForm.get('LastName');
  }

  get bdate() {
    return this.employeeForm.get('Birthdate');
  }
  getSkills(): void {
    this.skillGroup = this.skillData.getSkills();
  }

  getSkillName(id: number) {
    return this.skillData.getSkillName(id);
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
