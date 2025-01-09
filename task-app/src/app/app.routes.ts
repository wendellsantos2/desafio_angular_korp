import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TaskComponent } from './task/task.component';
import { NgModule } from '@angular/core';
import { PendingTasksComponent } from './task/pending-tasks/pending-tasks.component';
import { CompletedTasksComponent } from './task/completed-tasks/completed-tasks.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'task', component: TaskComponent },
  { path: 'pending', component: PendingTasksComponent},
  { path: 'sucess', component: CompletedTasksComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redireciona para home
  { path: '**', redirectTo: '/home' } // Rota coringa
];
