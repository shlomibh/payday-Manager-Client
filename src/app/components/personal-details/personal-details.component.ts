import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services';
import { Employee } from 'src/app/models/employee.model';
import { LectorService } from 'src/app/services/lector.service';

class Model {
  email = '';
  username = '';
  role = '';
}

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  model = new Model();
  updateEmployeeForm: FormGroup;
  errors: {};
  errorStatus: number;
  roleSelected;
  departSelected;
  currentUser;
  userFromDb: Employee;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private lecService: LectorService,
  ) {
    this.updateEmployeeForm = fb.group({
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      username: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(4)]],
      firstName: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(2)]],
      lastName: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(2)]],
      id: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      telephone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      role: ['', [Validators.required]],
      department: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser.id);
    this.lecService.getUserDetails(this.currentUser.id).subscribe(
      user => {
        this.userFromDb = user;
        console.log(this.userFromDb);
      });
    this.updateEmployeeForm.controls['email'].setValue('shadi@walla.com');
    this.updateEmployeeForm.controls['username'].setValue('shadi');
    this.updateEmployeeForm.controls['firstName'].setValue('שאדי');
    this.updateEmployeeForm.controls['lastName'].setValue('שאדי');
    this.updateEmployeeForm.controls['id'].setValue('111111111');
    this.updateEmployeeForm.controls['telephone'].setValue('0987654321');
    this.updateEmployeeForm.controls['role'].setValue('lector');
    this.updateEmployeeForm.controls['department'].setValue('software');
    console.log(this.updateEmployeeForm)
  }


  get emailControl(): AbstractControl {
    return this.updateEmployeeForm.get('email');
  }

  get usernameControl(): AbstractControl {
    return this.updateEmployeeForm.get('username');
  }

  get passwordControl(): AbstractControl {
    return this.updateEmployeeForm.get('password');
  }

  get firstNameControl(): AbstractControl {
    return this.updateEmployeeForm.get('firstName');
  }

  get lastNameControl(): AbstractControl {
    return this.updateEmployeeForm.get('lastName');
  }

  get idControl(): AbstractControl {
    return this.updateEmployeeForm.get('id');
  }

  get telephoneControl(): AbstractControl {
    return this.updateEmployeeForm.get('telephone');
  }

  get roleControl(): AbstractControl {
    return this.updateEmployeeForm.get('role');
  }

  get departmentControl(): AbstractControl {
    return this.updateEmployeeForm.get('department');
  }

  onSubmit() {
    console.log(this.updateEmployeeForm);
    if (
      this.telephoneControl.valid
      && this.roleControl.valid
      && this.departmentControl.valid
    ) {
      console.log(this.updateEmployeeForm.value);
      const employee: Employee = {
        username: this.usernameControl.value,
        email: this.emailControl.value,
        firstName: this.firstNameControl.value,
        lastName: this.lastNameControl.value,
        id: this.idControl.value,
        phoneNumber: this.telephoneControl.value,
        role: this.roleControl.value,
        department: this.departmentControl.value
      };
      console.log(employee);
      this.authService.update(employee).subscribe(

      );
    } else {
      console.log('else');


    }

  }
}
