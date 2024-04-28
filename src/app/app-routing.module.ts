import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './task/task.component';
//import { ArchiveComponent } from './archive/archive.component';
//import { TrashComponent } from './trash/trash.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
//import { AuthGuard } from './auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component'; 

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'task', component: TaskComponent },
  //{ path: 'archive', component: ArchiveComponent, canActivate: [AuthGuard] },
  //{ path: 'trash', component: TrashComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
