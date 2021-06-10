import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Skill } from '../skills/Skill';
import { ActivatedRoute } from '@angular/router';
import { SkillsService } from '../skills.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-skillsedit',
  templateUrl: './skillsedit.component.html',
  styleUrls: ['./skillsedit.component.css'],
})
export class SkillseditComponent implements OnInit {
  skill: Skill | undefined;
  skillSetForm = this.fb.group({
    SkillID: [''],
    SkillName: [''],
  });
  constructor(
    private fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private skillDataService: SkillsService
  ) {}

  ngOnInit(): void {
    this.getSkills();
  }
  getSkills() {
    var SkillID = this.activatedRoute.snapshot.paramMap.get('id');
    var SkillData = JSON.parse(localStorage.getItem('skilldata') || '{}');
    var skillInfo = SkillData.filter(
      (Skills: { SkillID: string | null }) => Skills.SkillID == SkillID
    );
    this.skill = skillInfo[0];
    this.skillSetForm.patchValue({
      SkillID: this.skill?.SkillID,
      SkillName: this.skill?.SkillName,
    });
  }
  updateSkills(): void {
    let skill = this.skillSetForm.value;
    this.skillDataService.updateSkills(skill);
    this.Notification = 'Skill has successfully been updated!';
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
    }, 2500);
  }
}
