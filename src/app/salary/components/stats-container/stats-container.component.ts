import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-stats-container',
  templateUrl: './stats-container.component.html',
  styleUrls: ['./stats-container.component.css']
})
export class StatsContainerComponent implements OnInit, OnDestroy{
  @Input() lecData;
  @Input() depData;

  constructor() { }

  ngOnInit() {
    console.log(this.lecData);
    //console.log(this.depData);
  }

  refresh(lecData: any, depData: any) {
    console.log('refreshed');
    this.lecData = lecData;
    this.depData = depData;
    console.log(this.lecData);
    //console.log(this.depData);
    this.ngOnDestroy();
    this.ngOnInit();
  }


  ngOnDestroy() {
   // this.lecData = undefined;
   // this.depData = undefined;
  }

}
