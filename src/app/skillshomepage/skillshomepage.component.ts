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
  SkillID = 0;

  constructor(private skillsData: SkillsService) {}

  ngOnInit(): void {
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

  btnRemoveSkill(SkillID: number): void {
    this.SkillID = SkillID;
    this.NotificationYN = 'Are you sure you want to remove this data?';
    this.showToastNotifYN();
  }
  btnRemoveYes() {
    this.skillsData.deleteDbSkill(this.SkillID).subscribe(
      (res) => console.log(res),
      (err) => console.log(err),
      () => {
        document.getElementById('modalCloseBtn')?.click();
        this.getSkills();
      }
    );

    this.showToastYN = false;
  }
  btnRemoveCancel() {
    this.getSkills();
    this.showToastYN = false;
  }

  NotificationYN = '';
  showToastYN = false;

  showToastNotifYN() {
    this.showToastYN = true;
  }
}
