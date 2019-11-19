import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './material/material.module';
import { ShiftComponent } from './components/shift/shift.component';
import { ShiftListComponent } from './components/shift-list/shift-list.component';
import { AddShiftComponent } from './components/add-shift/add-shift.component';
import { ShiftsContainerComponent } from './components/shifts-container/shifts-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ShiftComponent,
    ShiftListComponent,
    AddShiftComponent,
    ShiftsContainerComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ShiftComponent,
    ShiftListComponent,
    AddShiftComponent,
    ShiftsContainerComponent,
    AngularMaterialModule,
  ]
})
export class SharedModule { }
