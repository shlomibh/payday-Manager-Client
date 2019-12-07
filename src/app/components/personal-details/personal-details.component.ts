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
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser.id);
    this.lecService.getUserDetails(this.currentUser).subscribe(
      user => {
        this.userFromDb = user;
        console.log(this.userFromDb);
        this.updateEmployeeForm = fb.group({
          email: [{ value: this.userFromDb.email, disabled: true }, [Validators.required, Validators.email]],
          username: [{ value: this.userFromDb.username, disabled: true }, [Validators.required, Validators.minLength(4)]],
          // password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9]*[A-Z]+[a-zA-Z0-9]*')]],
          firstName: [{ value: this.userFromDb.firstName, disabled: true }, [Validators.required, Validators.minLength(2)]],
          lastName: [{ value: this.userFromDb.lastName, disabled: true }, [Validators.required, Validators.minLength(2)]],
          id: [{ value: this.userFromDb.id, disabled: true }, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
          telephone: [{ value: this.userFromDb.phoneNumber }, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
          role: [{ value: this.userFromDb.role }, [Validators.required]],
          department: [{ value: this.userFromDb.department}, [Validators.required]],
        });
      }
    );
  }

  ngOnInit() {

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
    const credentials = this.updateEmployeeForm.value;
    const employee: Employee = {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      id: credentials.id,
      phoneNumber: credentials.telephone,
      role: credentials.role,
      department: credentials.department
    };
    this.authService.register(employee).subscribe(
      employee => {
        console.log(employee);
        alert('העובד נוסף בהצלחה');
        this.updateEmployeeForm.reset();
      }
    );

  }
}
