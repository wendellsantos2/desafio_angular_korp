  import { HttpClientModule } from '@angular/common/http';
  import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { RouterModule, NavigationEnd, Router } from '@angular/router';
  import { filter } from 'rxjs/operators';
  import { Task, TaskService } from '../task/services/task.service';
  import { NavbarComponent } from "../components/navbar/navbar.component";

  @Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, HttpClientModule, FormsModule, RouterModule, NavbarComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [TaskService]  // Certifica-se de que o serviço está disponível
  })
  export class HomeComponent implements OnInit {
    tasks: Task[] = [];

    constructor(private taskService: TaskService, private router: Router) {}

    ngOnInit(): void {
      this.loadTasks();

      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this.loadTasks();
        });
    }

    loadTasks(): void {
      this.taskService.getTasks().subscribe({
        next: (tasks) => {
          this.tasks = tasks || [];
        },
        error: () => {
          console.error('Falha ao carregar as tarefas.');
        }
      });
    }

    trackByTaskId(index: number, task: Task): string {
      return task.id || index.toString();
    }

    goToAddTask(): void {
      this.router.navigate(['/task']);
    }

  }
