import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Shift } from 'src/app/models/shift.model';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css']
})
export class ShiftComponent implements OnInit {

  @Input() shift: Shift;
  @Output() deleteEE = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  delete(){
    console.log(this.shift._id);
    this.deleteEE.emit(this.shift._id);
  }

}
