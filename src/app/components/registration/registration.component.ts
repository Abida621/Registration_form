import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  dataSource: any;
  cityValue: boolean;
  cityData: any;
  userDetails: User;
  submitted = false;
  alertMessage: boolean = false;

  constructor(private router: Router, private authService: AuthenticationService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.authService.getStateApi().subscribe((res: any) => {
      this.dataSource = res;
    })
    this.registerForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', Validators.required],
        mobileNumber: ['', [Validators.required,
                            Validators.minLength(10), Validators.maxLength(10)]],
        address: ['', Validators.required],
        aadhar: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  get f() { return this.registerForm.controls; }

  selectState(state) {
    this.cityValue = true;
    let selectedCity = this.dataSource.filter(res => res.stateId == state.target.value)
    this.cityData = selectedCity[0].city;
    console.log(this.cityData);
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      return
   } else {
    this.alertMessage = true
   }
  }
}

export interface User {
  firstName: string,
  middleName: string,
  lastName: string,
  email: any,
  password: any,
  confirmPassword: any,
  aadhar: number,
  address: any,
  state: string,
  city: string
}