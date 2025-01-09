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
  newTaskDescription: string = '';
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
        this.tasks = tasks ? tasks.reverse() : [];  // Inverte a ordem das tarefas para exibir de cima para baixo
      },
      error: () => {
        // Opcional: Adicionar um alerta de erro para o usuário
        alert('Falha ao carregar tarefas. Verifique a conexão com o servidor.');
      }
    });
  }

  addTask(): void {
    if (this.newTaskTitle.trim() && this.newTaskDescription.trim()) {
      const newTask: Task = {
        id: '',
        name: this.newTaskTitle,
        description: this.newTaskDescription,
        isCompleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      this.taskService.addTask(newTask).subscribe({
        next: () => {
          this.loadTasks();  // Recarrega as tarefas após adicionar a nova tarefa
          this.newTaskTitle = '';
          this.newTaskDescription = '';  // Reseta os campos
        },
        error: () => {
          alert('Erro ao adicionar tarefa.');
        }
      });
    } else {
      alert('O título e a descrição da tarefa não podem estar vazios.');
    }
  }

  deleteTask(id: string | undefined): void {
    // Verifica se o id é válido
    if (!id) {
      alert('ID da tarefa inválido.');
      return;
    }

    // Exibe a confirmação antes de excluir
    const confirmDelete = window.confirm('Tem certeza que deseja excluir esta tarefa?');

    if (confirmDelete) {
      // Chama o serviço para excluir a tarefa
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks();  // Recarrega as tarefas após excluir
        },
        error: () => {
          // Alerta caso ocorra erro ao excluir
          alert('Erro ao excluir a tarefa.');
        }
      });
    }
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

  toggleTaskStatus(task: Task): void {
    task.isCompleted = !task.isCompleted;  // Alterna o status de "concluída" para "pendente" e vice-versa
    this.taskService.updateTask(task).subscribe({
      next: () => {
        this.loadTasks();  // Recarrega as tarefas após atualizar o status
      },
      error: () => {
        alert('Erro ao atualizar o status da tarefa.');
      }
    });
  }
}
