import { Injectable } from '@angular/core';
import { Skill } from './skills/Skill';
import { Skills } from './skills/Skills';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  skillUrl: string = 'http://localhost:3000/skill/';

  constructor(private router: Router, private http: HttpClient) {}

  //============================================================//
  //                    Get SKILLS                             //
  getSkills(): Skill[] {
    return Skills();
  }

  getDbSkills() {
    return this.http.get<Skill[]>(this.skillUrl, { responseType: 'json' });
  }
  getDbSkill(id: number) {
    return this.http.get<Skill>(this.skillUrl + id, { responseType: 'json' });
  }

  getSkillName(id: number): string {
    var Skill = 'NONE';
    for (let skill of this.getSkills()) {
      if (skill.SkillID === id) {
        Skill = skill.SkillName;
        break;
      }
    }
    return Skill;
  }

  //==========================================================//

  //============================================================//
  //                    ADD SKILLS                             //

  postDBSkill(skill: Skill) {
    const bodyRequest = {
      SkillName: skill.SkillName,
    };
    return this.http.post<string>(this.skillUrl, bodyRequest, {
      responseType: 'json',
    });
  }

  setSkills(skill: Skill): void {
    let skills = this.getSkills();
    skills.push(skill);
    window.localStorage.setItem('skilldata', JSON.stringify(skills));
  }

  //==========================================================//

  //============================================================//
  //                    Delete SKILLS                           //
  deleteDbSkill(id: number) {
    return this.http.delete<string>(this.skillUrl + id, {
      responseType: 'json',
    });
  }

  //==========================================================//
  //============================================================//
  //                    Update SKILLS                          //

  updateDbSkills(skill: Skill) {
    const bodyRequest = {
      SkillName: skill.SkillName,
    };
    return this.http.put<string>(this.skillUrl + skill.SkillID, bodyRequest, {
      responseType: 'json',
    });
  }
}
//==========================================================//
