import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SchedulePageComponent } from './components/schedule-page/schedule-page.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';


// ניתוב דפים-שם הדף ואיזה קומפננטות אני משתמש בכל דף,מי יכול לצפות בדף
const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'schedule', component: SchedulePageComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryPageComponent, canActivate: [AuthGuard] },
  { path: 'personal', component: PersonalDetailsComponent },
  { path: 'manager', loadChildren: () => import('src/app/manager/manager.module').then(m => m.ManagerModule), canActivate: [AuthGuard] },
  { path: 'salary', loadChildren: () => import('src/app/salary/salary.module').then(m => m.SalaryModule), canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
