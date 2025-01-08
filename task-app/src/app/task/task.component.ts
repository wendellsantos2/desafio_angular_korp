import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Task, TaskService } from './services/task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [TaskService]
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  editingTask: Task | null = null;
  newTaskTitle: string = '';

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadTasks();
      });
  }

  private loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks || [];
      },
      error: () => {
        // Opcional: Adicionar um alerta de erro para o usuário
        alert('Falha ao carregar tarefas. Verifique a conexão com o servidor.');
      }
    });
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: () => {
        // Opcional: Alerta de erro ao excluir
        alert('Erro ao excluir a tarefa.');
      }
    });
  }

  editTask(task: Task): void {
    this.editingTask = { ...task };
  }

  saveTask(): void {
    if (this.editingTask) {
      this.taskService.updateTask(this.editingTask).subscribe({
        next: () => {
          this.editingTask = null;
          this.loadTasks();
        },
        error: () => {
          // Opcional: Alerta de erro ao salvar edição
          alert('Erro ao salvar as alterações da tarefa.');
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingTask = null;
  }

  trackByTaskId(index: number, task: Task): string {
    return task.id || index.toString();
  }

  
}
