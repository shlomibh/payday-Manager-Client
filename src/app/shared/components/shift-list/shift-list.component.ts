import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Shift } from 'src/app/models/shift.model';
import { ShiftService } from 'src/app/services/shift.service';
import { AuthenticationService } from 'src/app/services';
import { Subscription } from 'rxjs';
import { IDate } from 'src/app/models/date.model';

@Component({
  selector: 'app-shift-list',
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.css']
})
// הקומפוננטה שמחשבת שעות עבודה,ימי מחלה,חופש,ביטול שיעור ושעות נוספות
export class ShiftListComponent implements OnInit, OnDestroy {

  @Input() shifts: Shift[];
  @Output() refreshEE = new EventEmitter();
  private subscriptions: Subscription[] = [];
  duration: number[] = [0, 0];// סוכם את השעות בכללי-בנוי כמערך כאשר השעות יהיו במקום הראשון והדקות יהיו במקום השני
  extraHours: number[] = [0, 0];// סוכם את השעות הנוספות-בנוי כמערך כאשר במקום הראשון יהיו השעות ובמקום השני יהיו הדקות
  canceledCounter = 0; // סוכם את כמות ביטולי שיעור
  dayoffCounter = 0;// סוכם את כמות ימי החופש
  sickCounter = 0;// סוכם את כמות ימי המחלה
  dailyDuration: number[] = [0, 0];// מערך עזר לצורך חישוב השעות באופן כללי
  date: string;
  dateToSend: IDate;

  constructor(
    private shiftService: ShiftService,
    private authService: AuthenticationService
  ) { }



  ngOnInit() {
    console.log(this.shifts);
    if (this.shifts.length > 0) {
      this.date = this.shifts[0].date;
      this.shifts.forEach(element => {  //הפונקציה רצה על המשמרות של אותו תאריך שנבחר
        if (this.date !== element.date) {
          this.date = element.date;
          this.updateDurationDetails();
        }
        if (element.absent === 'מחלה') { // אם קיים מחלה סוכם +1
          this.sickCounter++;
        } else if (element.absent === 'ביטול') { // אם קיים ביטול סוכם +1
          this.canceledCounter++;
        } else if (element.absent === 'חופש') {
          this.dayoffCounter++; // אם קיים חופש סוכם ב+1
        } else {
          this.calculateDuration(element.start, element.end); //   סוכם את השעות באופן כללי באמצעות הפונקציה המקבלת שעת התחלה ושעת סוף    
        }
      });
    }

    this.updateDurationDetails(); // חישוב שעות נוספות באמצעות הפונקציה
  }


  deleteShift(shiftId: string) { // מחיקת משמרת ועדכון הדף
    this.subscriptions.push(this.shiftService.delete(shiftId).subscribe(
      () => {
        this.refreshEE.emit();
        this.ngOnDestroy();
      }
    ));
  }
// הפונקציה שמחשבת שעות נוספות-שעות נוספות יחושבו כאשר אותו עובד עבד באותו יום 8 שעות ויותר
// ברגע שעבד שעה אחת יותר הנתון התעדכן בדף תחת הכותרת ״שעות נוספות״ וכל שעה מעל 8 שעות באותו יום תחושב כשעה אחת נוספת
  updateDurationDetails() {
    this.duration[0] += this.dailyDuration[0]; // סוכם את השעות
    this.duration[1] += this.dailyDuration[1]; // סוכם את הדקות
    this.updateHours(this.duration); // בדיקת תקינות השעות והדקות באמצעות הפונקציה
    if (this.dailyDuration[0] >= 8 && this.dailyDuration[1] > 0) { //אם השעות גדולות או שוות ל8 והדקות גדולות מ0-מספיק שהשעות גדולות מ8
      this.extraHours[0] += (this.dailyDuration[0] - 8); //עדכון וחישוב שעות הנוספות-מוצא את ההפרש בין סה״כ השעות שהתקבלו פחות 8 ומעדכן את השעות
      this.extraHours[1] += (this.dailyDuration[1]); // עדכון הדקות
      this.updateHours(this.extraHours); // שימוש בפונקציה הבודקת גם את תקינות השעות הנוספות
    } else if (this.dailyDuration[0] > 8) { // אם השעות גדולות מ8
      this.extraHours[0] += (this.dailyDuration[0] - 8); //מעדכן ומחשב ההפרש בין סה״כ השעות שהתקבלו פחות 8
    }
    this.dailyDuration = [0, 0]; // במידה ואף מקרה לא קורה יופיע בשעות הנוספות 0:0
  }

  //טיפול בשעות-כאשר אנחנו סוכמים השעות- מכיוון שאנו מציגים את הדקות עד הערך 60 נירצה לטפל במיקרה כאשר הדקות עולות על 60 זה ימצא את ההפרש בין 60 לבין מה שהתקבל ויוסיף את זה לדקות  
  updateHours(toChange: number[]) { // קבלת השעה המורכבת משעות-במקום הראשון ודקות במקום השני
    if (toChange[1] > 60) { // אם חישוב הדקות גדולות מ60 
      const hourToAdd = toChange[1] / 60; // מחלקים את הדקות ב60 ומכניסים למשתנה את התוצאה השלם
      const splitedHour = hourToAdd.toString().split('.'); //     split מכניסים את התוצאה המתקבלת למשתנה ומחלקים אותה ל2-מה שלפני הנקודה ומה שאחרי הנקודה באמצעות הפונקציה 
      toChange[0] = toChange[0] + (+splitedHour[0]); //חישוב השעות-מה שלפני הנקודה זה השעה והוא סוכם את זה למשתנה של השעות 
      toChange[1] = toChange[1] - (+splitedHour[0] * 60);// הדקות יחושבו בצורה הבאה-נכפיל את השעות שהתקבלו ב60 ונחסיר אותם מהדקות וכך נקבל את ההפרש:לדוגמא אם חישבנו את השעות וקבלנו את התוצאה הבאה 4:78
    }                                                    //78>60
                                                         //78/60=1.3
                                                         //78-1*60=18
                                                         // לכן זה יוסיף 18 דקות למשתנה שסוכם את הדקות
  }
// חישוב השעות באופן כללי-מקבל שעת התחלה ושעת סוף
// היכן שמופיע + בצמוד למשתנה(לא כסוכם) זה הופך את המשתנה למספר*
  calculateDuration(start: string, end: string) {

    const splitedStart = start.split(':'); // מחלק את שעת ההתחלה-מה שלפני הנקודותיים ומה שאחרי
    const splitedEnd = end.split(':'); //מחלק את שעת הסוף-מה שלפני הנקודותים ומה שאחרי
    let hourDiff = +splitedEnd[0] - (+splitedStart[0]); // חישוב השעות-מציאת ההפרש בין שעת הסוף לבין שעת ההתחלה
    let minDiff = 0;
    const minStart = +splitedStart[1]; //  הדקות של שעת ההתחלה
    const minEnd = +splitedEnd[1]; // הדקות של שעת הסוף
// חישוב השעות הסופי לאחר חישוב של הדקות של שעת ההתחלה ושעת הסוף תוך התיחחסות לכל ששעה שווה ל60 דקות
    if (minStart > minEnd) { // אם הדקות של שעת ההתחלה יותר גדולות מהדקות של שעת הסוף
      hourDiff = hourDiff - 1; // מחסיר ב1 מסה״כ השעות
      minDiff = 60 - (minStart - minEnd); // הדקות יהיו שוות להפרש בין 60 לבין ההפרש בים דקות ההתחלה לדקות הסוף
      //דוגמא:מרצה התחיל בשעה 08:30 וסיים בשעה 10:20 סה״כ השעות שעבר הינם שעה ו50 דקות
      //לפי הפונקציה ההפרש בין שעת ההתחלה לשעת הסוף הינה 2,לאחר מכן נחסיר ב1
      // הפרש הדקות הינו 10 ואז נעשה 60-10=50
      // ואז נקבל1:50  
    } else if (minStart < minEnd) { // מקרה שבו דקות הסוף יותר גדולות מדקות ההתחלה
      minDiff = minEnd - minStart; // מציאת ההפרש בינהם והכנסתם למשתנה
    }

    this.dailyDuration[0] += hourDiff; //עדכון השעות
    this.dailyDuration[1] += minDiff;//עדכון הדקות
  }

  refresh() { // רענון הדף בהתאם 
    this.ngOnDestroy();
    this.ngOnInit();
  }
// פונקציה שמטפלת בכפתור של הראש מחלקה כאשר הוא מאשר את המשמרות שדיווח מרצה שתחתיו
  submitShifts() {
    this.shifts.forEach(s => {
      if(s.lectorSubmitted ===  false || s.lectorSubmitted === undefined) { // ראש מחלקה יכול לאשר משמרות של מרצה רק אם המרצה גם אישר את הדיווחים שלו 
        s.lectorSubmitted = true;                                           //     שאומר אם המרצה אישר או לא,אם הוא יתקבל כשקר או לא קיים הוא הופך את זה לאמת באופן אוטומטי(ראש המחלקה יכול לצפות בדיווחים של מרצה גם אם המרצה לא אישר) lectorsubmitted   במידה והראש מחלקה קיבל משמרות של מרצה אך המשתנה 
        s.dateLectorSubmit = new Date().toLocaleDateString(); //התאריך אותו אישר המרצה את הדיווח שעות שלו-התאריך הנוכחי לפי המחשב
      };
    });
    this.dateToSend = { // התאריך שנשלח לפי חודש ושנה
      month: new Date().getMonth()+1, // מספרי החודש מוצג מ0-11 ה+1 נועד לכלול את החודש 12
      year: new Date().getFullYear(), 
    };
    this.subscriptions.push(this.shiftService.submitShifts(this.shifts[0].employeeId, this.dateToSend).subscribe( //המשמרות שנישלחו לשרת לפי חודש ושנה
      (data) => {
        if(data)
        console.log('success') // הדפסת הודעה בהתאם במידה ופעולה זו הצליחה
      }
    ));
  }
// כאשר אין שימוש בקומפוננטה זו והיא ״נהרסת״ המשתנים מתאפסים-כאשר ניגמר חודש
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.duration = [0, 0];
    this.extraHours = [0, 0];
    this.canceledCounter = 0;
    this.dayoffCounter = 0;
    this.sickCounter = 0;
  }

}
