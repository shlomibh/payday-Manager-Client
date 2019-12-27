import { Component, OnInit, ViewChild } from '@angular/core';
import { LectorService } from 'src/app/services/lector.service';
import { AuthenticationService } from 'src/app/services';
import { IDate } from 'src/app/models/date.model';

@Component({
  selector: 'app-submit-shifts-page',
  templateUrl: './submit-shifts-page.component.html',
  styleUrls: ['./submit-shifts-page.component.css']
}) //קומפננטה האחראית אישור המשמרות של ראש המחלקה
export class SubmitShiftsPageComponent implements OnInit {
  @ViewChild('shiftCont', {static: false}) ShiftsContainer;
  id: string;
  lectors;
  checked = false;
  choosenLectorId: string;
  choosenDate: IDate;
  countClick = 0;

  constructor(
    private lectorService: LectorService,
    private authService: AuthenticationService
    ) { }
// הצגת המרצים שתחת אותו ראש המחלקה
  ngOnInit() {
    this.id = this.authService.getCurrentUser().id;
    this.lectorService.getLectorsListOfDepart(this.id).subscribe(
      data => {
        this.lectors = data;        
      }
    );
  }
// רענון הדף בין מרצה למרצה
  searchCompleted(data){
    this.countClick = this.countClick +1;
    console.log(data);
    this.choosenLectorId = data.lector;
    this.choosenDate = data.date;
    this.checked = true;
    if(this.countClick > 1)
      {
        this.ShiftsContainer.currentUserId = this.choosenLectorId;
        this.ShiftsContainer.date = this.choosenDate;
        this.ShiftsContainer.refresh();
      }
  }
}
