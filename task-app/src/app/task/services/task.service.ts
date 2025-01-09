import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../enviroments/environments';

export interface Task {
  id?: string;
  name: string;
  description?: string;
  isCompleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get all tasks from the server
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      catchError(this.handleError<Task[]>('getTasks', []))
    );
  }

  /**
   * Get only pending tasks
   */
  getPendingTasks(): Observable<Task[]> {
    return this.getTasks().pipe(
      map((tasks) => tasks.filter((task) => !task.isCompleted))
    );
  }

  /**
   * Get only completed tasks
   */
  getCompletedTasks(): Observable<Task[]> {
    return this.getTasks().pipe(
      map((tasks) => tasks.filter((task) => task.isCompleted))
    );
  }

  /**
   * Add a new task
   */
  addTask(task: Task): Observable<Task> {
    const { id, ...taskWithoutId } = task; // Remove `id` if it exists
    return this.http.post<Task>(this.apiUrl, taskWithoutId).pipe(
      catchError(this.handleError<Task>('addTask'))
    );
  }

  /**
   * Update an existing task
   */
  updateTask(task: Task): Observable<Task> {
    if (!task.id) {
      return throwError(() => new Error('A tarefa precisa de um ID para ser atualizada.'));
    }
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task).pipe(
      catchError(this.handleError<Task>('updateTask'))
    );
  }

  /**
   * Delete a task by ID
   */
  deleteTask(id: string): Observable<void> {
    if (!id) {
      return throwError(() => new Error('ID da tarefa não fornecido para exclusão.'));
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<void>('deleteTask'))
    );
  }

  /**
   * Handle HTTP errors
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`${operation} failed:`, error.message);
      return of(result as T);
    };
  }
}
