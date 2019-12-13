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

  ) {
    this.shiftForm = fb.group({
      date: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      absent: ['']
    });
  }

  ngOnInit() {
  }

  get dateControl(): AbstractControl {
    return this.shiftForm.get('date');
  }

  get startControl(): AbstractControl {
    return this.shiftForm.get('start');
  }

  get endControl(): AbstractControl {
    return this.shiftForm.get('end');
  }


  get absentControl(): AbstractControl {
    return this.shiftForm.get('absent');
  }

  markedChecked() {
    if (this.shiftForm.get('absent').value === 'מחלה' || this.shiftForm.get('absent').value === 'חופש') {
      this.checked = true;
    } else {
      this.checked = false;
    }
  }

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

  createShift(): Shift | boolean {
    const date = this.dateControl.value;
    const userID = this.authService.getCurrentUser().id;
    if (date === '' || date === null) { return false; }
    const finalDate = new Date(date['_d']).toLocaleDateString();
    if (this.checked) { // The employee was absent
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
    } else {
      const timeValidation = this.checkHours();
      if (timeValidation) {
      const start = this.startControl.value;
      const end = this.endControl.value;
      const absent = this.absentControl.value;
      if (start !== '' && end !== '' && absent !== '') {
        const shift: Shift = {
          date: finalDate,
          employeeId: userID,
          start,
          end,
          absent
        };
        return shift;
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

  onSubmit() {
    const shift = this.createShift();
    console.log(shift);
    if (shift) {
      this.shiftService.post(shift as Shift).subscribe(
        shift => {
          this.shiftForm.reset();
          this.addClickedEE.emit(true);
        },
        error => {
          alert("יש כפילות במשמרות / משמרות חופפות");
        }
      );
    } else {
      alert("פרטים לא נכונים / לא מלאים");
    }

  }
}
