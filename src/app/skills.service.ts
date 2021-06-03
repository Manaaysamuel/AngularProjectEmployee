import { Injectable } from '@angular/core';
import {Skill} from './skills/Skill';
import {Skills} from './skills/Skills';
@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor() { }

  getSkills() : Skill[] { 
    return Skills();
  }

  setSkills(skill : Skill) : void {
    let skills = this.getSkills();
    skills.push(skill);
    window.localStorage.setItem("skilldata",JSON.stringify(skills));
  }
}
