import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, switchMap } from 'rxjs';
import { AuthenticateService } from '../../interceptors/services/authenticate.service';

@Injectable({
  providedIn: 'root',
})

// TODO pasar jwt para poder hacer las consultas a la api
export class TaskService {
  private URL: string = 'http://localhost:8000';
  private _taskList: Task[] = [];

  constructor(
    private http: HttpClient,
    private authenticateService: AuthenticateService
  ) {}

  public get taskList(): Task[] {
    return this._taskList;
  }

  public searchAllTasks() {
    // Verifico el token y obtengo el id del usuario
    this.authenticateService.verifyToken().subscribe((userId) => {
      // Ruta de la api
      const url = `${this.URL}/tasks/${userId}`;

      // Consulta de tareas
      this.http.get<Task[]>(url).subscribe((resp) => {
        this._taskList = resp;
      });
    });
  }

  public searchTask(id: string): Observable<Task> {
    // Obtengo, el id del usuario
    return this.authenticateService.verifyToken().pipe(
      switchMap((userId: string) => {
        // Realizo la consulta http con el id que emos obtenido anteriormente
      return this.http.get<Task>(`${this.URL}/tasks/${userId}/${id}`);
    }));
  }

  public addTask(task: Task): Observable<any> {
    return this.http.post(this.URL + '/tasks/add', task).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.error || { detail: 'Error desconocido' });
      })
    );
  }
}
