import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { IDate } from 'src/app/models/date.model';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services';
import { Employee } from 'src/app/models/employee.model';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-satistics-header',
  templateUrl: './satistics-header.component.html',
  styleUrls: ['./satistics-header.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class SatisticsHeaderComponent implements OnInit {
  @Output() lecDataEE = new EventEmitter();
  @Output() depDataEE = new EventEmitter();
  @Input() isLecStats: boolean;
  @Input() isDepartStats: boolean;
  options =['ביטול שיעור', 'מחלה', 'חופש', 'שעות נוספות', 'הגשת דוח בזמן'];
  queries =['canceled', 'sickness', 'dayoff', 'extraHours', 'inTime'];
  dateToSend: IDate;
  date = new FormControl(moment());
  selected;

  constructor(
    public route: ActivatedRoute,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  showStats() {
    console.log(this.selected);
    if (this.selected !== undefined) {
      if (this.date.value["_isValid"]) {
        const date = new Date(this.date.value["_d"]).toLocaleDateString();
        const splitedDate = date.split('/');
        this.dateToSend = {
          month: +splitedDate[0], // Shlomi: +splitedDate[0]
          year: +splitedDate[2]
        };
        let dataToSend;
        const choseQuery = this.selectQuery(this.selected);
        if(this.isLecStats) 
        {
          dataToSend = { type: 'lectors', stat: choseQuery, date: this.dateToSend };
          console.log(dataToSend);
          this.lecDataEE.emit(dataToSend);
        }
        else if(this.isDepartStats){
          dataToSend = { type: 'department', stat: choseQuery, date: this.dateToSend };
          this.depDataEE.emit(dataToSend);
        }
      }
    } else {
      console.log('you did not choose date or lector');
    }
  }

  selectQuery(selected){
    switch(selected){
      case 'ביטול שיעור':
        return this.queries[0];
      case 'מחלה':
        return this.queries[1];
      case 'חופש':
        return this.queries[2];
      case 'שעות נוספות' :
        return this.queries[3];
      case 'הגשת דוח בזמן':
        return this.queries[4]
      default:
        return this.queries[0];
    }
  }
}
