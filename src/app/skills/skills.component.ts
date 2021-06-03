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
    window.location.reload();

    // var new_data = (this.skillSetForm?.value);
    // console.log(new_data);
    // console.log(JSON.stringify(this.skillSetForm?.value));
    // if(localStorage.getItem('skills') == null){
    //   localStorage.setItem('skills','[]');
    // }
    // var old_data = JSON.parse(localStorage.getItem('skills') || '{}');
    // console.log(old_data);
    
    // old_data.push(new_data);
    // localStorage.setItem('skills',JSON.stringify(old_data));
  }
  

}
