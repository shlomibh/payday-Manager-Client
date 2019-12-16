import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

class Model { // כשיש טופס עושים מודל לטופס-האלמנטים העיקרים שבחרתי באקראי
  email = '';
  username = '';
  role = '';
}
//הקומפוננטה שאחראית עף הדף של הוספת עובד חדש
@Component({
  selector: 'app-add-employee-page',
  templateUrl: './add-employee-page.component.html',
  styleUrls: ['./add-employee-page.component.css']
})
export class AddEmployeePageComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  model = new Model();
  addEmployeeForm: FormGroup; 
  //errors: {};
  //errorStatus: number;
  //roleSelected;
  //departSelected;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
  ) { //  מילוי הטופס תוך דרישה מהשתמש לחוקיות של קלט וחובה למילוי של כל הפרטים
    this.addEmployeeForm = fb.group({
      email: ['', [Validators.required, Validators.email]], //אימייל חוקי-לפי התבנית שלו החוקית שלו המחייבת @
      username: ['', [Validators.required, Validators.minLength(4)]],// שם משתמש לפחות 4 אותיות
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z0-9]*[A-Z]+[a-zA-Z0-9]*')]],//סיסמא הבנויה מ8 תוים המחייבים אות גדולה באנגלית אות קטנה באנגלית ומספרים 0-9
      firstName: ['', [Validators.required, Validators.minLength(2)]],// שם פרטי של המשתמש מינימום שתי אותיות
      lastName: ['', [Validators.required, Validators.minLength(2)]],//שם משפחה של המשתמש מינימום שתי אותיות
      id: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],// תעודת זהות של המשתמש המחייבת 9 מספרים
      telephone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],//מספר הפלאפון של המשתמש המחייבת 10 מספרים
      role: ['', [Validators.required]],//  תפקיד המשתמש החדש
      department: ['', [Validators.required]],//מחלקה של המשתמש החדש
    });
  }
//  הפעלת הקומפוננטה וקבלת הנתונים שהזין המשתמש ופנייתם לשרת
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

  get idControl(): AbstractControl {
    return this.addEmployeeForm.get('id');
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
// כשנלחץ הכפתור ״הוסף עובד״ הוא מכניס למשתמש החדש את הערכים שהכניס המשתמש
  onSubmit() {
    const credentials = this.addEmployeeForm.value;
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
    this.authService.register(employee).subscribe(  //     במידה ותקין מוציא הודעה ״העובד נוסף בהצלחה״ "register" לאחר שנישלח בקשה לשרת ליצור עובד חדש השרת בודק באמצעות פונקציה שקיימת בו -
      employee => {
        console.log(employee);
        alert('העובד נוסף בהצלחה');
        this.addEmployeeForm.reset(); //מציג את הדף מחדש
      }
    );

  }

}
