import { Component, OnInit, Input } from '@angular/core';
import { Shift } from 'src/app/models/shift.model';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css']
})
export class ShiftComponent implements OnInit {

  @Input() shift: Shift;

  constructor() { }

  ngOnInit() {
  }

}
