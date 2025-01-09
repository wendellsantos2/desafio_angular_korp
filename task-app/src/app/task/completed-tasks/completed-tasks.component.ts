import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Task, TaskService } from '../services/task.service';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css'], // Corrigido de `styleUrl` para `styleUrls`
})
export class CompletedTasksComponent implements OnInit {
  completedTasks: Task[] = []; // Lista de tarefas concluídas
  isLoading = true; // Controla o estado de carregamento
  errorMessage = ''; // Armazena mensagens de erro

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadCompletedTasks();
  }

  /**
   * Carrega as tarefas concluídas do serviço
   */
  private loadCompletedTasks(): void {
    this.isLoading = true;
    this.taskService.getCompletedTasks().subscribe({
      next: (tasks) => {
        this.completedTasks = tasks ? tasks.reverse() : []; // Ordena de cima para baixo
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar tarefas concluídas. Tente novamente mais tarde.';
        console.error('Erro:', error);
        this.isLoading = false;
      },
    });
  }

  /**
   * Marca a tarefa como pendente
   */
  markAsPending(task: Task): void {
    task.isCompleted = false;
    this.taskService.updateTask(task).subscribe({
      next: () => this.loadCompletedTasks(),
      error: (error) => {
        this.errorMessage = 'Erro ao reabrir a tarefa. Tente novamente.';
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
        next: () => this.loadCompletedTasks(),
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
