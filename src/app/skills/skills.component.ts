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
  skillSetForm = this.formBuilder();
  constructor(
    private fb: FormBuilder,
    private SkillsData: SkillsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.skillSetForm = this.formBuilder();
    console.log(this.location.path());
  }
  formBuilder() {
    var SkillData = JSON.parse(localStorage.getItem('skilldata') || '{}');
    var skillList;
    var staticSkillVal = [{ SkillID: 0, SkillName: '' }];
    if (SkillData.length <= 0) {
      skillList = staticSkillVal[staticSkillVal.length - 1];
    } else {
      skillList = SkillData[SkillData.length - 1];
    }

    for (
      var skillLastArrayVal = skillList[skillList.length - 1];
      skillLastArrayVal >= 0;

    );

    return this.fb.group({
      SkillID: [skillList.SkillID + 1],
      SkillName: [''],
    });
  }
  submit() {
    let skill = this.skillSetForm?.value;
    let skilldatainfo: Skill = {
      SkillID: skill.SkillID,
      SkillName: skill.SkillName,
    };
    this.SkillsData.setSkills(skilldatainfo);
    this.skillSetForm = this.formBuilder();
    document.getElementById('SkillID')?.focus();
    this.Notification = 'New Skill has successfully been added!';
    this.showToastNotif();
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
