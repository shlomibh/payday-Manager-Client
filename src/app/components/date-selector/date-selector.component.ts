//קומפונטה האחראית על ״בחירת תאריך מלוח שנה המובנה בדף״
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { IDate } from 'src/app/models/date.model';
// node.js שימוש ב״מומנט״-אובייקט מסוג זה עובד גם בדפדפן וגם ב 
//משתמשים באובייקט זה כאשר רוצים לעבוד עם תאריכים וזמנים
const moment = _moment;

export const MY_FORMATS = { // הפורמט בו המשתמש יכול להזין כל סוג של תאריך עם כל פורמט ויפורמט לפורמט שנציין למטה
  parse: {
    dateInput: 'MM/YYYY', //הפורמט אליו יפורמטו כלל הפורמטים
  },
  display: {  // הפורמטים הקיימים
    dateInput: 'MM/YYYY', //כתיבת התאריך המדויק 
    monthYearLabel: 'MMM YYYY', //בחירת התאריך מלו״ח שנה שיוצג
    dateA11yLabel: 'LL', // פורמט נוסף-רושמים את החודש באנגלית,יום ,שנה
    monthYearA11yLabel: 'MMMM YYYY', // פורמט נוסף
  },
};
//הגדרת הקומפונטה
@Component({
  selector: 'app-date-selector', //זיהוי הקומפונטה
  templateUrl: './date-selector.component.html', //מבנה הקומפונטה
  styleUrls: ['./date-selector.component.css'], //עיצוב הקמפונוטה
  providers: [  //ממשקים הקשורים לממשקי תאריכים שבהם הקומופנטה משתמשת
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
}) 
// אתחול המחלקה שמטפלת בבחירת תאריך מהמשתמש
export class DateSelectorComponent implements OnInit {
  @Output() dateEE = new EventEmitter(); //   המטפל באירועים עם פלט "EventEmitter" משתנה מסוג 
  dateToSend: IDate; // "IDate"משתנה עם הממשק של התאריך 
  date = new FormControl(moment()); //התאריך אותו בחר המשתמש:input האירוע המתקבל ב 

  constructor() { }

  ngOnInit() {
  }
// בחירת השנה בה בחר אותה המשתמש
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value; //השנה אותה בחר המשתמש והכנסתה למשתנה
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue); // formשולח את הערך המתקבל ל ל
  }
// בחירת החודש בה בחר אותו המשתמש
  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;  //החודש אותו בחר המשתמש והכנסתו למשתמש
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);// formשולח את הערך המתקבל ל ל
    datepicker.close(); //סגירת חלון בחירת החודש והשנה ע״י המשתמש
  }
// מציג את המשמרות אותם בחר המשתמש לפי התאריך
  showShifts() {
    if (this.date.value["_isValid"]) { // בודק האם המשתמש אכן בחר תאריך
      const date = new Date(this.date.value["_d"]).toLocaleDateString(); //   והופך אותו למחרוזתDate  יוצר משתנה מסוג 
      const splitedDate = date.split('/'); // פונקציה זו מחלקת את המחרוזת לפי התו שמתקבל-split חילוץ השנה והחודש באמצעות פונקציית  
      // console.log(splitedDate);
      this.dateToSend = {
        month: +splitedDate[0], // Shlomi: +splitedDate[0] // החודש יהיה במקום הראשון
        year: +splitedDate[2] // השנה תהיה במקום השלישי
      };
      console.log(this.dateToSend);
      this.dateEE.emit(this.dateToSend); // (הצגת התאריך (באופן מסודר
    } else {
      console.log('you did not choose date'); // אחרת מוציא הודעה שהמשתמש לא בחר תאריך
    }
  }

}
