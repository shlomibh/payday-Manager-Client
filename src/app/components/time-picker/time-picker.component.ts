import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-time-picker",
  templateUrl: "./time-picker.component.html",
  styleUrls: ["./time-picker.component.css"]
})
export class TimePickerComponent implements OnInit {
  time = { hour: 8, minute: 30 };
  constructor() {}

  ngOnInit() {}
}
