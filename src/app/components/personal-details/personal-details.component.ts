import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services';
import { Employee } from 'src/app/models/employee.model';
import { LectorService } from 'src/app/services/lector.service';

class Model {   //מודל של הטופס-כאשר אנו משתמשים בטופס אנחנו צריכים ליצור לו מודל-האלמנטים ניבחרו באופן אקראי,ניתן לרשום את כל האלמנטים הקיימים
  email = '';
  username = '';
  role = '';
}

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
//הקומפוננטה האחראית על הדף של ״פרטים אישים״
export class PersonalDetailsComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  model = new Model();
  updateEmployeeForm: FormGroup; //טופס הדף
  //errors: {};
  //errorStatus: number;
  //roleSelected;
  //departSelected;
  currentUser; //המשתמש הנוכחי
  userFromDb: Employee; //משתמש הקיים בבסיס הנתונים
  checkValid = true; // אם הולידציה נכונה או לא
  constructor(
    private fb: FormBuilder, // טופס הדף
    private router: Router,// נתב
    private authService: AuthenticationService, // בדיקת אימות
  ) {  // הצגת הטופס עם כל פרטיו תוך בדיקה שהשדות לא ריקים ואופן הצגתם חוקי לפי כל אלמנט
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

  //  שתפקידה הוא להחזיר את המשתמש הקיים getCurrentUser הפלת הקומפוננטה-מתקבל המשתמש הנוכחי לפי פונקציית 
  //     מתקבלים כל פרטי המשתמש getUserDeatails לאחר מכן באמצעות פונקצית
  //   כדי לשלוח לטופס את פרטי המשתמש לפי כל פרט set  שימוש ב   
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

// קבלת פרטי המשתמש מהשרת
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
    if (                                   // בדיקה אם כל האלמנטים האלו ״חוקיים״
      this.telephoneControl.valid
      && this.roleControl.valid
      && this.departmentControl.valid
    ) {
      console.log(this.updateEmployeeForm.value);
      const employee: Employee = {    // ערכי הפרטים הקיימים אצל העובד
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
      this.authService.update(employee).subscribe(       //        הקיימת בשרת שמקבלת מספר טלפון או תפקיד או מחלקה שהזין המשתמש ומעדכנת אותם בבסיס הנתונים ושומרת אותם update שימוש בפונקציית   
        user => {
          console.log(user);
          this.router.navigate(['']); //לאחר מכן מנתבת לדף הבית
        }
      );
    } else {
      console.log('else');  // אם יש בעיה בתקינות הפרטים שהקיש המשתמש מדפיס הודעה למשתמש ״הזנת פרטים שגויים״
      this.checkValid = false;

    }

  }
}
