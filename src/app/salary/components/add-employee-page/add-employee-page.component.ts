import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

class Model {
  email = '';
  username = '';
  role = '';
}

@Component({
  selector: 'app-add-employee-page',
  templateUrl: './add-employee-page.component.html',
  styleUrls: ['./add-employee-page.component.css']
})
export class AddEmployeePageComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  model = new Model();
  addEmployeeForm: FormGroup;
  errors: {};
  errorStatus: number;
  roleSelected;
  departSelected;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.addEmployeeForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9]*[A-Z]+[a-zA-Z0-9]*')]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      telephone: ['', [Validators.required]],
      role: ['', [Validators.required]],
      department: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }


  get emailControl(): AbstractControl {
    return this.addEmployeeForm.get('email');
  }

  get usernameControl(): AbstractControl {
    return this.addEmployeeForm.get('username');
  }

  get passwordControl(): AbstractControl {
    return this.addEmployeeForm.get('password');
  }

  get firstNameControl(): AbstractControl {
    return this.addEmployeeForm.get('firstName');
  }

  get lastNameControl(): AbstractControl {
    return this.addEmployeeForm.get('lastName');
  }


  get telephoneControl(): AbstractControl {
    return this.addEmployeeForm.get('telephone');
  }

  get roleControl(): AbstractControl {
    return this.addEmployeeForm.get('role');
  }

  get departmentControl(): AbstractControl {
    return this.addEmployeeForm.get('department');
  }

  onSubmit() {
    const credentials = this.addEmployeeForm.value;
    console.log(credentials);
  }

  formValidation(): boolean {
    if (this.roleSelected === 'manager' || this.roleSelected === 'lector') {
      return this.addEmployeeForm.valid;
    } else {
      return (
        this.emailControl.valid && this.usernameControl.valid &&
        this.passwordControl.valid && this.roleControl.valid &&
        this.telephoneControl.valid && this.firstNameControl.valid && this.lastNameControl.valid


      );
    }
  }

  // hasError(controlName: string) {
  //   const control = this.addEmployeeForm.controls[controlName];
  //   return (control.errors && (control.dirty || control.touched));
  // }

}
