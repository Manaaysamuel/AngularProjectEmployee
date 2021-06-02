import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skillSetForm: FormGroup | undefined;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.skillSetForm = this.fb.group({
      skills: '',
    })
  }
  submit(){
    var new_data = (this.skillSetForm?.value);
    console.log(new_data);
    console.log(JSON.stringify(this.skillSetForm?.value));
    if(localStorage.getItem('skills') == null){
      localStorage.setItem('skills','[]');
    }
    var old_data = JSON.parse(localStorage.getItem('skills') || '{}');
    console.log(old_data);
    
    old_data.push(new_data);
    localStorage.setItem('skills',JSON.stringify(old_data));
  }

}
