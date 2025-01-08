import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TaskService } from '../task/services/task.service';

@Component({
  selector: 'app-home',
  standalone: true,  // Standalone Component
  imports: [CommonModule],  // Importa CommonModule para usar ngFor e ngIf
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
 
  }
}
