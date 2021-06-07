import { Injectable } from '@angular/core';
import {Skill} from './skills/Skill';
import {Skills} from './skills/Skills';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(
    private router: Router
  ) { }

  getSkills() : Skill[] { 
    return Skills();
  }

  setSkills(skill : Skill) : void {
    let skills = this.getSkills();
    skills.push(skill);
    window.localStorage.setItem("skilldata",JSON.stringify(skills));
  }

  getSkillName(id : number) : string {
    var Skill = "NONE";
    for(let skill of this.getSkills()){
      if(skill.SkillID === id){
        Skill = skill.SkillName;
        break;
      }
    }
    return Skill;
  }

  updateSkills(skill : Skill) : void {
    const getID = this.router.url.split('/')[2];
    let skills = this.getSkills();
    
    // const index = skills.findIndex( skillData => skillData.SkillID === skill.SkillID );
    // console.log(index)
     var SkillData = JSON.parse(localStorage.skilldata);
    //  console.log(SkillData)
    for (var i = 0; i < SkillData.length; i++) {
   if(getID == SkillData[i].SkillID){ 
    // console.log(SkillData[i].SkillName)
    // console.log(skill.SkillName)
     SkillData[i].SkillName = skill.SkillName; 

       break;  
   }
}

   localStorage.setItem("skilldata", JSON.stringify(SkillData));  
  }  
}
