import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TaskComponent } from './task/task.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/task',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },  // Nova rota para Home
  { path: 'task', component: TaskComponent },
];
