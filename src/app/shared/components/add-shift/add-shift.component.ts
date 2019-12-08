import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Shift } from 'src/app/models/shift.model';
import { ShiftService } from 'src/app/services/shift.service';
import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.css']
})
export class AddShiftComponent implements OnInit {

  @Output() addClickedEE = new EventEmitter();
  shiftForm: FormGroup;

  checked = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private shiftService: ShiftService

  ) { //      שעל המשתמש למלא:תאריך שעת התחלת עבודה שעת סיום עבודה ואם החסיר input  מספר של  
    this.shiftForm = fb.group({
      date: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      absent: ['']
    });
  }

  ngOnInit() {
  }
// התאריך שבחר המשתמש
  get dateControl(): AbstractControl {
    return this.shiftForm.get('date');
  }
// שעת התחלת שבחר המשתמש
  get startControl(): AbstractControl {
    return this.shiftForm.get('start');
  }
// שעת הסוף שבחר המשתמש
  get endControl(): AbstractControl {
    return this.shiftForm.get('end');
  }

// הסיבה שהחסיר יום עבודה שבחר המשתמש
  get absentControl(): AbstractControl {
    return this.shiftForm.get('absent');
  }
// פונקציה שבודקת אם המשתמש בחר מחלה או חופש לצורך טיפול במקרים אלו ומחזירה אמת או שקר בהתאם
  markedChecked() {
    if (this.shiftForm.get('absent').value === 'מחלה' || this.shiftForm.get('absent').value === 'חופש') {
      this.checked = true;
    } else {
      this.checked = false;
    }
  }
// בדיקת תקינות שעות העבודה שנבחרו כלומר-הפונקציה בודקת אם שעת ההתחלה קטנה משעת הסוף 
//בודקת גם אם שעת ההתחלה שווה  לשעת הסוף אבל הדקות של שעת ההתחלה יותר גדולות מדקות שעת הסוף
//ובודקת אם דיווח את אותה שעת דיוח
//מקרים כאלו ניקראים מקרי קיצון-מקרים שלא יכולים לקרות הפונקציה מחזירה שקר ולא עושה עם זה כלום
//אם מקרים אלו לא קרו היא מחזירה אמת
  checkHours(): boolean {
    const start = this.startControl.value;
    const end = this.endControl.value;
    const startTime = start.split(':');
    const endTime = end.split(':');
    if (+startTime[0] > +endTime[0]) {
      return false;
    } else if (+startTime[0] === +endTime[0]  && +startTime[1] > +endTime[1]) {
        return false;
      } else if (+startTime[0] === +endTime[0] && +startTime[1] === +endTime[1]) {
      return false;
    }
    return true;
  }
//יצירת דיווח משמרת של אותו משתמש
// המשתמש בוחר את התאריך בו עבד-המשתמש חייב לבחור תאריך ולא יכול להשאיר את הקלט ריק אחרת יצא יחזיר שקר
//      reson אם המרצה בחר מחלה או חופש הוא מכניס את הבחירה של המשתמש למשתנה      
//לאחר מכן הוא מחזיר את המשמרת:תאריך המשמרת והסיבה בה בחר בגינה נעדר מאותו יום
  createShift(): Shift | boolean {
    const date = this.dateControl.value;
    const userID = this.authService.getCurrentUser().id;
    if (date === '' || date === null) { return false; }
    const finalDate = new Date(date['_d']).toLocaleDateString();
    if (this.checked) { 
      console.log('absent');
      const reason = this.absentControl.value;
      console.log(reason);
      if (reason === '' || reason === null) { return false; }
      const shift: Shift = {
        date: finalDate,
        employeeId: userID,
        absent: reason
      };
      return shift;
      //אחרת אם לא בחר מחלה או חופש הפונקציה בודקת את תקינות השעות שמילא ומכניסה למשתנים את שעת ההתחלה ושעת הסוף-אם בחר ביטול שיעור עדין יוכל למלא שעת התחלה ושעת סוף-כי יכול להיות מיקרה שהוא ביטל כמה שעות באותו יום אך המשיך לעבוד אחרי זה
    } else {
      const timeValidation = this.checkHours();
      if (timeValidation) {
      const start = this.startControl.value;
      const end = this.endControl.value;
      const absent = this.absentControl.value;//במידה ובחר ביטול שיעור
      if (start !== '' && end !== '' && absent !== '') {
        const shift: Shift = {
          date: finalDate,
          employeeId: userID,
          start,
          end,
          absent
        };
        return shift;
        // מחזיר את המשמרת -תאריך המשמרת ועת התחלה וסוף שבאותו תאריך ביטל שיעור
        
        // פה מדובר במיקרה הקלאסי שלא בחר מחלה או חופש או ביטול שיעור ומראה את התאריך שבחר ואת שעת ההתחלה ושעת הסוף שעבד באותו יום
      } else if (start !== '' && end !== '') {
        const shift: Shift = {
          date: finalDate,
          employeeId: userID,
          start,
          end,
        };
        return shift;
      }
    } else {
      return false;
    }
    }
    return false;
  }
// כשהמשתמש לוחץ על ״הוסף דיווח״ זה שולח לשרת את הדיווח מציג למשתמש ונותן לו עוד אופציה להוסיף דיווח
  onSubmit() {
    const shift = this.createShift();
    console.log(shift);
    if (shift) {
      this.shiftService.post(shift as Shift).subscribe(
        shift => {
          this.shiftForm.reset();
          this.addClickedEE.emit(true);
        }
      );
    } else {
      console.log('form invalid');  // need to set pop-up error
    }

  }
}
