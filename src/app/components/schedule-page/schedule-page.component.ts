import { Component, OnInit } from '@angular/core';
import { Shift } from 'src/app/models/shift.model';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.css']
})
export class SchedulePageComponent implements OnInit {

  shifts: Shift[] = [
    {
      date: '23/10/2019',
      id: 'dasd2edasd2a2aa',
      absent: 'מחלה'
    },
    {
      date: '23/10/2019',
      id: 'dasd2edasd2a2aa',
      start: '10:30',
      end: '11:30'
    },
    {
      date: '22/10/2019',
      id: 'dasd2edasd2a2aa',
      absent: 'ביטול שיעור'
    },
    {
      date: '21/10/2019',
      id: 'dasd2edasd2a2aa',
      absent: 'מחלה'
    },
    {
      date: '23/10/2019',
      id: 'dasd2edasd2a2aa',
      start: '10:30',
      end: '12:30'   
     },

  ]

  constructor() { }

  ngOnInit() {
  }

}
