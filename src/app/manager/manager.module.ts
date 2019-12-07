import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitShiftsPageComponent } from './submit-shifts-page/submit-shifts-page.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { SubmitHeaderComponent } from './submit-header/submit-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LecShiftsContainerComponent } from './lec-shifts-container/lec-shifts-container.component';


@NgModule({
  declarations: [
    SubmitShiftsPageComponent,
    SubmitHeaderComponent,
    LecShiftsContainerComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule, 
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManagerModule { }
