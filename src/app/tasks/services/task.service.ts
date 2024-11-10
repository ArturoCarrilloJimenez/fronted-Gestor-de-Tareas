import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private URL: string = 'http://localhost:8000';
  private _taskList: Task[] = [];

  constructor ( private http : HttpClient ) {}

  public get taskList(): Task[] {
    return this._taskList;
  }

  public searchTask() {
    this.http.get<Task[]>(this.URL + '/tasks/').subscribe((resp) => {
      this._taskList = resp
    });
  }
}
