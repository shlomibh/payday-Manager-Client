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
    const date = this.shift.date.split('/');
    this.shift.date = `${date[1]}/${date[0]}/${date[2]}`; 
  }

  delete(){
    this.deleteEE.emit(this.shift._id);
  }

}
