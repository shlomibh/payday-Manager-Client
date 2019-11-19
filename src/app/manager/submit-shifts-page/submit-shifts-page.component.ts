import { Component, OnInit } from '@angular/core';
import { LectorService } from 'src/app/services/lector.service';
import { AuthenticationService } from 'src/app/services';
import { IDate } from 'src/app/models/date.model';

@Component({
  selector: 'app-submit-shifts-page',
  templateUrl: './submit-shifts-page.component.html',
  styleUrls: ['./submit-shifts-page.component.css']
})
export class SubmitShiftsPageComponent implements OnInit {
  id: string;
  lectors;
  checked = false;
  choosenLectorId: string;
  choosenDate: IDate;

  constructor(
    private lectorService: LectorService,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {
    this.id = this.authService.getCurrentUser().id;
    this.lectorService.getLectorsListOfDepart(this.id).subscribe(
      data => this.lectors = data
    );
  }

  searchCompleted(data){
    this.choosenLectorId = data.lector;
    this.choosenDate = data.date;
    this.checked = true;
  }
}
