import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Output } from '@angular/core';
import { ShiftService } from 'src/app/services/shift.service';
import { AuthenticationService } from 'src/app/services';
import { User } from 'src/app/models/User';
import { Subscription } from 'rxjs';
import { Shift } from 'src/app/models/shift.model';
import { IDate } from 'src/app/models/date.model';

//הקומפוננטה האחראית על הטבלה של דיווח שעות
@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.css']
})
export class SchedulePageComponent implements OnInit {

  currentUser: User;  // מקבלת משתמש,מערך של משמרות ותאריך
  shifts: Shift[];
  currentlyDate: IDate;

  constructor(  
    private authService: AuthenticationService  
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser(); //         getCurrentUser  קבלת המשתמש הנוכחי באמצעות פונקציית שירות      
    const date = new Date().toLocaleDateString(); // התאריך הנוכחי מהמחשב עצמו והמרתו למחרוזת
    const splittedDate = date.split('/'); // חלוקת התאריך כאשר החודש יופיע ראשון והשנה תופיע אחרון-קיימת בעיה במק כאשר מחלצים מהתאריך את החודש הוא שם אותו במקום של היום ולכן נאלצתי לסדר את התאריך
    this.currentlyDate = { month: +splittedDate[0], year: +splittedDate[2] }; 
  }

}
