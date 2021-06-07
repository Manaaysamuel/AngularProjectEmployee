import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import{Skill} from './Skill';
import {SkillsService} from '../skills.service';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  SkillID : number = 1;
  SkillList : Skill[] = [];
  // skillSetForm: FormGroup | undefined;
  skillSetForm  = this.formBuilder();
  constructor(
    private fb:FormBuilder,
    private SkillsData : SkillsService
    ) { }

  ngOnInit(): void {
    this.getSkills();
    this.skillSetForm = this.formBuilder();
  }
  formBuilder() {
    for(;this.SkillList.findIndex(skill=>skill.SkillID===this.SkillID) > -1; this.SkillID++);

    return this.fb.group({
         SkillID : [this.SkillID],
         SkillName: ['']
      })
  }
  getSkills() : void {
    this.SkillList = this.SkillsData.getSkills();
  }
  submit(){
    let skill = this.skillSetForm?.value;
    let skilldatainfo : Skill = {
      SkillID: skill.SkillID,
      SkillName: skill.SkillName,
    }
    this.SkillsData.setSkills(skilldatainfo);
    this.skillSetForm = this.formBuilder();
    document.getElementById("SkillID")?.focus();
    window.alert("New Skill has been successfully added");
    window.location.reload();
  }

  
btnRemove(SkillID : number) : void {
  var SkillData = JSON.parse(localStorage.getItem('skilldata') || '{}');
  // window.confirm("Are you sure you want to delete this data?");
if (confirm("Are you sure you want to delete this data?")) {
  SkillData = SkillData.filter((Skill: { SkillID: number; }) => Skill.SkillID != SkillID);
  window.localStorage['data'] = JSON.stringify(SkillData);
  console.log(SkillData);
  window.location.reload();
} else {
  window.location.reload();
}
}
  

}
