import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../enviroments/environments';

export interface Task {
  id: string;
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

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        return of([]);
      })
    );
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(task);
      })
    );
  }

  updateTask(task: Task): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${task.id}`, task).pipe(
      catchError(() => of())
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => of())
    );
  }
}
