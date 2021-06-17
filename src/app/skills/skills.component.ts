import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Skill } from './Skill';
import { SkillsService } from '../skills.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  SkillList: Skill[] = [];
  SkillID: number = 1;
  skillSetForm = this.InitializeData();
  constructor(
    private fb: FormBuilder,
    private SkillsData: SkillsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.InitializeData();
    this.skillSetForm = this.InitializeData();
  }

  InitializeData() {
    for (
      ;
      this.SkillList.findIndex((skill) => skill.SkillID == this.SkillID) > -1;
      this.SkillID++
    );

    return this.fb.group(
      {
        SkillID: [this.SkillID],
        SkillName: [''],
      },
      { updateOn: 'blur' }
    );
  }
  submit() {
    let skill: Skill = this.skillSetForm.value;
    this.SkillsData.postDBSkill(skill).subscribe((message) => {
      this.Notification = 'New Skill Added!';
      this.showToastNotif();
      document.getElementById('SkillID')?.focus();
    });
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
