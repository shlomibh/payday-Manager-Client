import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HistoryComponent } from './components/history/history.component';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { CommonModule } from '@angular/common';
import { SchedulePageComponent } from './components/schedule-page/schedule-page.component';
import { AddShiftComponent } from './components/add-shift/add-shift.component';
import { AngularMaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShiftComponent } from './components/shift/shift.component';
import { ShiftListComponent } from './components/shift-list/shift-list.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HistoryComponent,
    TimePickerComponent,
    SchedulePageComponent,
    AddShiftComponent,
    ShiftComponent,
    ShiftListComponent,
    HistoryPageComponent,
    DateSelectorComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AngularMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
