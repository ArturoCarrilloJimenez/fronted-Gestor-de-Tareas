import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// TODO pasar jwt para poder hacer las consultas a la api
export class TaskService {
  private URL: string = 'http://localhost:8000';
  private _taskList: Task[] = [];
  private userId: string = 'ca9ba32d-22f6-4b50-b304-b1b9def3c090'

  constructor(private http: HttpClient) {}

  public get taskList(): Task[] {
    return this._taskList;
  }

  public searchAllTasks() {
    const url = `${this.URL}/tasks/${this.userId}`
    this.http.get<Task[]>(url).subscribe((resp) => {
      this._taskList = resp;
    });
  }

  public searchTask(id: string): Observable<any> {
    return this.http.get<Task>(`${this.URL}/tasks/${this.userId}/${id}`)
  }

  public addTask(task: Task): Observable<any> {
    return this.http.post(this.URL + '/tasks/add', task).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.error || {detail: 'Error desconocido'});
      })
    );
  }
}
