import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubmitShiftsPageComponent } from './submit-shifts-page/submit-shifts-page.component';

// ניתוב הדף ושימוש הקומפננטה הקיימת בדף
const routes: Routes = [{path: 'submit', component: SubmitShiftsPageComponent}]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
