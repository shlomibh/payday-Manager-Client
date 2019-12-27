import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeePageComponent } from './components/add-employee-page/add-employee-page.component';
import { StatisticalPageComponent } from './components/statistical-page/statistical-page.component';
import { TimeSubmittedComponent } from './components/time-submitted/time-submitted.component';
import { ShiftsContainerComponent } from './components/shifts-container/shifts-container.component';
// ניתוב הדפים הקשורים למנהלת שכר ושימוש הקומפננטות בכל דף
const routes: Routes = [
    { path: 'addEmployee', component: AddEmployeePageComponent },
    { path: 'lectorStatistics', component: StatisticalPageComponent },
    { path: 'departmentStatistics', component: StatisticalPageComponent },
    { path: 'timeSubmitted', component: TimeSubmittedComponent },
    { path: 'shifts/:id', component: ShiftsContainerComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalaryRoutingModule { }
