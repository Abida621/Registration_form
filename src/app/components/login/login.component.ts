import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
form:FormGroup;
  @ViewChild('TemplateForm') TemplateForm: NgForm;
  constructor() {}
private formBuilder:FormBuilder;
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      username:['admin@tis.com', Validators.required , Validators.email],
      password:['welcome20tis', Validators.required,]
    })
  }
  loginFormSubmit() {}
}


