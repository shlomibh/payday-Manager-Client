// הקומפוננטה שאחראית על דף שמציג את היסטורית הדיוחחים של אותו משתמש
import { Component, OnInit } from '@angular/core';
import { ShiftService } from 'src/app/services/shift.service';
import { AuthenticationService } from 'src/app/services';
import { User } from 'src/app/models/User';
import { IDate } from 'src/app/models/date.model';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {
  currentUser: User;
  date: IDate = {month: 1, year: 1900};
  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

}
