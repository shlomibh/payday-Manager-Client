import { Component, OnInit, OnDestroy } from '@angular/core';
import { Shift } from 'src/app/models/shift.model';
import { ShiftService } from 'src/app/services/shift.service';
import { AuthenticationService } from 'src/app/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shift-list',
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.css']
})
export class ShiftListComponent implements OnInit, OnDestroy {
  
  private subscriptions: Subscription[] = [];
  shifts: Shift[];
  duration: number[] = [0, 0];
  extraHours: number[] = [0, 0];
  canceledCounter: number = 0 ;
  dayoffCounter: number = 0;
  sickCounter: number = 0;

  constructor(
    private shiftService: ShiftService,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {
    this.subscriptions.push(this.shiftService.get(this.authService.getCurrentUser().id).subscribe(
      data => {
        this.shifts = data;
        data.forEach(element => {
          if(element.absent === "מחלה"){
            this.sickCounter++;
          }
          else if(element.absent === "ביטול"){
            this.canceledCounter++;
          }
          else if(element.absent === "חופש"){
            this.dayoffCounter++;
          }
          else{
            let elementDuration = this.calculateDuration(element.start, element.end);
          }
        })
      }
    ));
  }

  deleteShift(shiftId: String){
    this.subscriptions.push(this.shiftService.delete(shiftId).subscribe(
      () => this.refresh()
    ));
  }

  refresh(){
    this.ngOnDestroy();
    this.ngOnInit();
  }

  calculateDuration(start: String, end: String){
    const splitedStart = start.split(':');
    const splitedEnd = start.split(':');
    //this.duration[0] += (+splitedEnd[0] - (+splitedStart[0]))
    const hourStart = new Date("01/01/2007 " + start).getHours();
    const hourEnd = new Date("01/01/2007 " + end).getHours();

    const hourDiff = hourEnd - hourStart;
    console.log(hourDiff);
    if(hourDiff > 8){
      this.extraHours[0] += (hourDiff - 8);
    }
    this.duration[0] += hourDiff;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.duration = [0,0];
    this.extraHours = [0,0];
    this.canceledCounter = 0;
    this.dayoffCounter = 0;
    this.sickCounter = 0;
  }

}
