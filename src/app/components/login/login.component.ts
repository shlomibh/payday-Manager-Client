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
  loginForm: FormGroup; 
  loading = false;
  submitted = false;
  returnUrl: string;
  valid: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
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
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
  }

    this.loading = true;
    console.log(this.f.username.value,this.f.password.value);
    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
