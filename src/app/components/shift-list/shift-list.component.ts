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
  dailyDuration: number[] = [0, 0];
  date: string;

  constructor(
    private shiftService: ShiftService,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {
    this.subscriptions.push(this.shiftService.get(this.authService.getCurrentUser().id).subscribe(
      data => {
        this.shifts = data;
        this.shifts.sort((a: Shift,b:Shift)=> new Date(a.date).getTime() - new Date(b.date).getTime());
        this.date = this.shifts[0].date;
        console.log(this.date);
        this.shifts.forEach(element => {
          console.log(element.date); 
          if(this.date !== element.date){
            this.date = element.date;
            this.updateDurationDetails(); 
          }
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
            this.calculateDuration(element.start, element.end);
          }
        });
        this.updateDurationDetails();
      }
    ));
  }

  deleteShift(shiftId: String){
    this.subscriptions.push(this.shiftService.delete(shiftId).subscribe(
      () => this.refresh()
    ));
  }

  updateDurationDetails(){
    this.duration[0] += this.dailyDuration[0];
    this.duration[1] += this.dailyDuration[1];
    this.updateHours(this.duration); 
    if(this.dailyDuration[0] >= 8 && this.dailyDuration[1] > 0){
      this.extraHours[0] += (this.dailyDuration[0] - 8);
      this.extraHours[1] += (this.dailyDuration[1]);
      this.updateHours(this.extraHours);
    }
    else if(this.dailyDuration[0] > 8){
      this.extraHours[0] += (this.dailyDuration[0] - 8);
    }
    this.dailyDuration = [0,0];
  }

  updateHours(toChange: number[]){
    if(toChange[1] > 60){
      const hourToAdd = toChange[1] / 60;
      const splitedHour = hourToAdd.toString().split('.');
      toChange[0] = toChange[0] + (+splitedHour[0]);
      toChange[1] = toChange[1] - (+splitedHour[0]*60);
    }
  }
  refresh(){
    this.ngOnDestroy();
    this.ngOnInit();
  }

  calculateDuration(start: String, end: String){
    
    const splitedStart = start.split(':');
    const splitedEnd = end.split(':');
    let hourDiff = +splitedEnd[0] - (+splitedStart[0]);
    let minDiff = 0;
    const minStart = +splitedStart[1];
    const minEnd = +splitedEnd[1];

    if(minStart > minEnd){
      hourDiff = hourDiff - 1;  
      minDiff = 60 -  (minStart - minEnd);
    }
    else if(minStart < minEnd){
      minDiff = minEnd - minStart;
    }

    this.dailyDuration[0] += hourDiff;
    this.dailyDuration[1] += minDiff;
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
