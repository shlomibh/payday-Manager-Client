import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SchedulePageComponent } from './components/schedule-page/schedule-page.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';



const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'schedule', component: SchedulePageComponent, canActivate: [AuthGuard] },
  {path: 'history',component: HistoryPageComponent,canActivate: [AuthGuard] },
  {path: 'manager', loadChildren: () => import('src/app/manager/manager.module').then(m => m.ManagerModule)},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
