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
  checkValid = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
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
    this.authService.getUserDetails(this.currentUser.id).subscribe(
      user => {
        this.userFromDb = user;
        this.updateEmployeeForm.controls['email'].setValue(this.userFromDb.email);
        this.updateEmployeeForm.controls['username'].setValue(this.userFromDb.username);
        this.updateEmployeeForm.controls['firstName'].setValue(this.userFromDb.firstName);
        this.updateEmployeeForm.controls['lastName'].setValue(this.userFromDb.lastName);
        this.updateEmployeeForm.controls['id'].setValue(this.userFromDb.id);
        this.updateEmployeeForm.controls['telephone'].setValue(this.userFromDb.phoneNumber);
        this.updateEmployeeForm.controls['role'].setValue(this.userFromDb.role);
        this.updateEmployeeForm.controls['department'].setValue(this.userFromDb.department);
      });

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
        user => {
          console.log(user);
          this.router.navigate(['']);
        }
      );
    } else {
      console.log('else');
      this.checkValid = false;

    }

  }
}
