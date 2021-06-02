import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeForm: FormGroup | undefined;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id:'',
      name: '',
      lastname:'',
      birthdate:'',

    })
    // this.employeeForm.valueChanges.subscribe(console.log)
  }
  submit(){
    var new_data = (this.employeeForm?.value);
    console.log(new_data);
    console.log(JSON.stringify(this.employeeForm?.value));
    if(localStorage.getItem('data') == null){
      localStorage.setItem('data','[]');
    }
    var old_data = JSON.parse(localStorage.getItem('data') || '{}');
    console.log(old_data);
    
    old_data.push(new_data);
    localStorage.setItem('data',JSON.stringify(old_data));

  //  window.localStorage.setItem("employee-list",JSON.stringify(this.employeeForm?.value));
  }
  
  
}
