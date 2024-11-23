import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, switchMap } from 'rxjs';
import { AuthenticateService } from '../../interceptors/services/authenticate.service';

@Injectable({
  providedIn: 'root',
})
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
      this.http.get<Task[]>(url).subscribe({
        next: (resp) => {
          this._taskList = resp;
        },
        error: (error) => {
          // En caso de que ocurra un error devuelvo un array vació
          this._taskList = [];
        },
      });
    });
  }

  public searchTask(id: string): Observable<Task> {
    // Obtengo, el id del usuario
    return this.authenticateService.verifyToken().pipe(
      switchMap((userId: string) => {
        // Realizo la consulta http con el id que emos obtenido anteriormente
        return this.http.get<Task>(`${this.URL}/tasks/${userId}/${id}`);
      })
    );
  }

  public addTask(task: Task): Observable<any> {
    // Obtengo, el id del usuario
    return this.authenticateService.verifyToken().pipe(
      switchMap((userId: string) => {
        // Realizo la consulta http con el id que emos obtenido anteriormente
        task.user_id = userId // Le introduzco el id del usuario correspondiente
        return this.http.post(this.URL + '/tasks/add', task).pipe(
          catchError((error: HttpErrorResponse) => {
            return throwError(
              () => error.error || { detail: 'Error desconocido' }
            );
          })
        );
      })
    );
  }

  public updateTask(task: Task) {
    // Obtengo, el id del usuario
    return this.authenticateService.verifyToken().pipe(
      switchMap((userId: string) => {
        // Realizo la consulta http con el id que emos obtenido anteriormente
        return this.http
          .put<Task>(`${this.URL}/tasks/update/${userId}/${task.id}`, task)
          .pipe(
            // Obtengo el error y si no encuentra los detail muestra error desconocido
            catchError((error: HttpErrorResponse) => {
              return throwError(
                () => error.error || { detail: 'Error desconocido' }
              );
            })
          );
      })
    );
  }

  public deleteTask(id: string) {
    this.authenticateService.verifyToken().subscribe((userId) => {
      // Ruta de la api
      const url = `${this.URL}/tasks/delete/${userId}/${id}`;

      // Consulta de tareas
      this.http.delete<Task>(url).subscribe((resp) => {});
    });
  }
}
