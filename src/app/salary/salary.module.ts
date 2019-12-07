import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryRoutingModule } from './salary-routing.module';
import { AddEmployeePageComponent } from './components/add-employee-page/add-employee-page.component';
import { StatisticalPageComponent } from './components/statistical-page/statistical-page.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SatisticsHeaderComponent } from './components/satistics-header/satistics-header.component';
import { LectorStatsComponent } from './components/lector-stats/lector-stats.component';
import { DepartmentStatsComponent } from './components/department-stats/department-stats.component';
import { StatsContainerComponent } from './components/stats-container/stats-container.component';
import { ChartComponent } from './components/chart/chart.component';



@NgModule({
  declarations: [
    AddEmployeePageComponent,
    StatisticalPageComponent,
    SatisticsHeaderComponent,
    LectorStatsComponent,
    DepartmentStatsComponent,
    StatsContainerComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SalaryRoutingModule
  ],
  exports: [
    SalaryRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalaryModule { }
