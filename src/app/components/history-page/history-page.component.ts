// הקומפוננטה שאחראית על דף שמציג את היסטורית הדיוחים של אותו משתמש
import { Component, OnInit } from '@angular/core';
import { ShiftService } from 'src/app/services/shift.service';
import { AuthenticationService } from 'src/app/services';
import { User } from 'src/app/models/User';
import { IDate } from 'src/app/models/date.model';

//הגדרת הקומפננטה
@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
//       לצורך הפעלת הקומפוננטה oninit  שם הקומפננטה המשתמשת בפונקציית  
export class HistoryPageComponent implements OnInit {
  currentUser: User; //המשתמש הנוכחי
  date: IDate = {month: 1, year: 1900}; //מקבלת תאריך נבחר ע״י המשתמש
  constructor(     // הבנאי מקבל מתודה שירות-מתודה זו תפקידה לבצע אימות משתמש שאכן קיים ולהחזיר את פרטיו-
    private authService: AuthenticationService
  ) { }

  //מחזיר את המשתמש באמצעות שימוש בפונקציה המטפלת בכך(הסבר בפונקציה עצמה
  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

}

