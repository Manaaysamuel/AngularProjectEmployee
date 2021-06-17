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
  skillDataList = [];
  DataList = [];

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
    this.generateEmpID();
    this.InitializeData();
    this.employeeForm = this.InitializeData();
    this.skills.valueChanges.subscribe((data) => {
      this.employeeForm?.value.Skills.push(data);
      var data = this.employeeForm?.value.Skills;
      const SkillArrayList = data[data.length - 1];
      this.skillDataList = SkillArrayList.map((i: any) => Number(i));
    });
  }

  generateEmpID(): void {
    this.employeeData.empNextID().subscribe(
      (response) => (this.EmpID = response),
      (err) => console.error(err),
      () => {
        this.getEmployees();
      }
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

  InitializeData() {
    for (
      ;
      this.employeeLists.findIndex((emp) => emp.EmpID == this.EmpID) > -1;
      this.EmpID++
    );

    return this.fb.group(
      {
        EmpID: [this.EmpID],
        Name: [''],
        LastName: [''],
        Birthdate: [''],
        Skills: this.fb.array([]),
      },
      { updateOn: 'blur' }
    );
  }

  getSkills(): void {
    this.skillData.getDbSkills().subscribe(
      (Skills) => {
        this.skillGroup = Skills.map((skill) => {
          return {
            SkillID: skill.SkillID,
            SkillName: skill.SkillName,
          };
        });
      },
      (err) => console.log(err)
    );
  }

  get skillsinfo() {
    return this.employeeForm?.get('skills') as FormArray;
  }

  submit(): void {
    let employee = this.employeeForm?.value;
    let data: Employee = {
      EmpID: employee.EmpID,
      Name: employee.Name,
      LastName: employee.LastName,
      Birthdate: employee.Birthdate,
      Skills: this.skillDataList,
    };
    this.employeeData.postDBEmployee(data).subscribe(
      (res) => console.log(res),
      (err) => console.error(err),
      () => {
        this.employeeForm?.patchValue({
          EmpID: '',
          Name: '',
          LastName: '',
          Birthdate: '',
          Skills: [],
        });
        document.getElementById('employeeID')?.focus();
        this.Notification = 'New Employee Added!';
        this.showToastNotif();
      }
    );
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
