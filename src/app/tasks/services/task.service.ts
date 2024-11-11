import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private URL: string = 'http://localhost:8000';
  private _taskList: Task[] = [];

  constructor(private http: HttpClient) {}

  public get taskList(): Task[] {
    return this._taskList;
  }

  public searchTask() {
    this.http.get<Task[]>(this.URL + '/tasks/ca9ba32d-22f6-4b50-b304-b1b9def3c090').subscribe((resp) => {
      this._taskList = resp;
    });
  }

  public addTask(task: Task): Observable<any> {
    return this.http.post(this.URL + '/tasks/add', task).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.error || 'Error desconocido');
      })
    );
  }
}
