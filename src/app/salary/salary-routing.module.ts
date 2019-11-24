import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeePageComponent } from './components/add-employee-page/add-employee-page.component';
import { StatisticalPageComponent } from './components/statistical-page/statistical-page.component';


const routes: Routes = [
    { path: 'addEmployee', component: AddEmployeePageComponent },
    { path: 'statistics', component: StatisticalPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalaryRoutingModule { }
