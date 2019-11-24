import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './material/material.module';
import { ShiftComponent } from './components/shift/shift.component';
import { ShiftListComponent } from './components/shift-list/shift-list.component';
import { AddShiftComponent } from './components/add-shift/add-shift.component';
import { ShiftsContainerComponent } from './components/shifts-container/shifts-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SharedRoutingModule } from './shared-routing.module';



@NgModule({
  declarations: [
    ShiftComponent,
    ShiftListComponent,
    AddShiftComponent,
    ShiftsContainerComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedRoutingModule,
  ],
  exports: [
    ShiftComponent,
    ShiftListComponent,
    AddShiftComponent,
    ShiftsContainerComponent,
    HeaderComponent,
    SharedRoutingModule,
    AngularMaterialModule,
  ]
})
export class SharedModule { }
