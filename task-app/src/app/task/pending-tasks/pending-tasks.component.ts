import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Task, TaskService } from '../services/task.service';

@Component({
  selector: 'app-pending-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.css'], // Corrigido de `styleUrl` para `styleUrls`
})
export class PendingTasksComponent implements OnInit {
  pendingTasks: Task[] = []; // Lista de tarefas pendentes
  isLoading = true; // Controla o estado de carregamento
  errorMessage = ''; // Armazena mensagens de erro

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadPendingTasks();
  }

  /**
   * Carrega as tarefas pendentes do serviço
   */
  private loadPendingTasks(): void {
    this.isLoading = true;
    this.taskService.getPendingTasks().subscribe({
      next: (tasks) => {
        this.pendingTasks = tasks ? tasks.reverse() : []; // Ordena de cima para baixo
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar tarefas pendentes. Tente novamente mais tarde.';
        console.error('Erro:', error);
        this.isLoading = false;
      },
    });
  }

  /**
   * Marca a tarefa como concluída
   */
  markAsCompleted(task: Task): void {
    task.isCompleted = true;
    this.taskService.updateTask(task).subscribe({
      next: () => this.loadPendingTasks(),
      error: (error) => {
        this.errorMessage = 'Erro ao concluir a tarefa. Tente novamente.';
        console.error('Erro:', error);
      },
    });
  }

  /**
   * Exclui uma tarefa
   */
  deleteTask(taskId: string): void {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta tarefa?');
    if (confirmDelete) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => this.loadPendingTasks(),
        error: (error) => {
          this.errorMessage = 'Erro ao excluir a tarefa. Tente novamente.';
          console.error('Erro:', error);
        },
      });
    }
  }

  /**
   * Método para rastrear os itens na lista
   */
  trackByTaskId(index: number, task: Task): string {
    return task.id || index.toString();
  }
}
