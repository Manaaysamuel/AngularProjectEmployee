import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    this.getSkill();
  }

  getSkill() {
    const skillID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.skillDataService.getDbSkill(skillID).subscribe((skill) => {
      this.skill = skill;
      this.skillSetForm.patchValue({
        SkillID: this.skill?.SkillID,
        SkillName: this.skill?.SkillName,
      });
    });
  }

  updateChange(): void {
    let skill = this.skillSetForm.value;
    this.skillDataService.updateDbSkills(skill).subscribe(
      (response) => response,
      (err) => console.log(err),
      () => console.log('Updated')
    );
    document.getElementById('modalCloseBtn')?.click();
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
    }, 1000);
  }
}
