import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { Employee } from '../employee/employee';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';
import{Skill} from '../skills/Skill';
import { ActivatedRoute } from '@angular/router';
import {SkillsService} from '../skills.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-skillsedit',
  templateUrl: './skillsedit.component.html',
  styleUrls: ['./skillsedit.component.css']
})
export class SkillseditComponent implements OnInit {
skill : Skill | undefined;
skillSetForm = this.fb.group(
  {
    SkillID : [''],
    SkillName :['']
  }
)

  constructor(

    private fb:FormBuilder,
    private location : Location,
    private activatedRoute : ActivatedRoute,
    private employeeDataService : RegistrationService,
    private skillDataService :SkillsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSkills();
  }
  getSkills(){
    const getSkillID = this.router.url.split('/')[2];
    var SkillData = JSON.parse(localStorage.getItem('skilldata') || '{}');
    var SkillDatas =  SkillData.filter(function(Skills: { SkillID: string; }) {
      return Skills.SkillID == getSkillID;
    })

    this.skill = SkillDatas[0];
   
      this.skillSetForm.patchValue({
        SkillID : this.skill?.SkillID,
        SkillName : this.skill?.SkillName
      }); 
  }
  updateSkills() : void {
    let skill = this.skillSetForm.value;
    this.skillDataService.updateSkills(skill);
    window.alert("Skill selected has been successfully updated");
    // window.location.reload();
    this.router.navigate(['/skills']);
 
   
  }

}
