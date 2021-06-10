import { Component, OnInit } from '@angular/core';
import { Skill } from '../skills/Skill';
import { SkillsService } from '../skills.service';
@Component({
  selector: 'app-skillshomepage',
  templateUrl: './skillshomepage.component.html',
  styleUrls: ['./skillshomepage.component.css'],
})
export class SkillshomepageComponent implements OnInit {
  SkillList: Skill[] = [];
  SkillDataList = [];
  constructor(private skillsData: SkillsService) {}

  ngOnInit(): void {
    this.getSkills();
  }
  getSkills(): void {
    this.SkillList = this.skillsData.getSkills();
  }
  btnRemoveSkill(SkillID: number): void {
    this.SkillDataList = JSON.parse(localStorage.getItem('skilldata') || '{}');
    this.NotificationYN = 'Are you sure you want to remove this data?';
    this.showToastNotifYN();
    this.SkillDataList = this.SkillDataList.filter(
      (Skill: { SkillID: number }) => Skill.SkillID != SkillID
    );
  }
  btnRemoveYes() {
    console.log('yes');
    window.localStorage['skilldata'] = JSON.stringify(this.SkillDataList);
    this.getSkills();
    this.showToastYN = false;
  }
  btnRemoveCancel() {
    this.getSkills();
    console.log('NO');
    this.showToastYN = false;
  }

  NotificationYN = '';
  showToastYN = false;

  showToastNotifYN() {
    this.showToastYN = true;
  }
}
