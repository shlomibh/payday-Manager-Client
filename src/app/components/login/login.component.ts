import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";
import { AlertService, AuthenticationService } from "../../services";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//קומפוננטה של התחברות המשתמש
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // טופס ההתחברות
  loading = false; // משתנה בוליאני-אם המערכת במצב טעינה 
  submitted = false; // משתנה בוליאני-
  returnUrl: string;// כתובת דף ההתחברות
  valid: boolean = false;
  constructor(    
    private formBuilder: FormBuilder, //טופס הדף
    private route: ActivatedRoute,// נתב
    private router: Router,
    private authenticationService: AuthenticationService, // שימוש במתודה האחראית על בדיקת אימות משתמש-הסבר בפונקציה עצמה
    private alertService: AlertService // שימוש בחלון התראה כאשר ישנה שגיאה
  ) {
    // אם המשתמש כבר במצב מחובר אז השרת מנתב אותו לדף הבית
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }
//       שם משתמש וסיסמא בודקת ולידציה של תקינות הכתיבה(השם משתמש הוא בעצם אימייל והיא בודקת אם כתב לפי התבנית המקובלת:Input הפעלת הקומפוננה שמקבלת  
  //וסיסמא שבנויה מאות גדולה באנגלית חובה ואות קטנה באנגלית ומספרים
ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
    // כתובת דף הבית
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

   // גישה לשדות הנמצאים בטופס והחזרתם
   get f() { return this.loginForm.controls; }
//    (הסבר בקומפוננטה עצמה) authenticationService הקיימת בקומפננטה  login הפונקציה שבודקת את הנתונים שהקיש המשתמש ומבצעת בדיקת אימות באמצעות פונקציה    
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) { 
      return;
  }

    this.loading = true;
    console.log(this.f.username.value,this.f.password.value);
    this.authenticationService // אם בדיקת האימות מתבצעת באופן תקין המתמש מתחבר למערכת והנתב מנתב אותו לדף הבית של המערכת
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate([this.returnUrl]);
        },
        error => {      // במידה ויש בעיה בבדיקת אימות או בולידציה יוצאת הודעת שגיאה
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
