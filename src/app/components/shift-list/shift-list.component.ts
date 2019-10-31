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

  constructor(
    private shiftService: ShiftService,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {
    this.subscriptions.push(this.shiftService.get(this.authService.getCurrentUser().id).subscribe(
      data => this.shifts = data
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
