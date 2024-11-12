import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { CardTaskComponent } from '../../components/card-task/card-task.component';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { AddTaskComponent } from "../../components/form-task/form-task.component";
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-edit-task-page',
  standalone: true,
  imports: [CardTaskComponent, AddTaskComponent],
  templateUrl: './edit-task-page.component.html',
  styleUrl: './edit-task-page.component.css',
})

export class EditTaskPageComponent implements OnInit {
  public originTask: Task = {
    id: '',
    title: '',
    description: '',
    completed: false,
    user_id: '',
  };

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.taskService.searchTask(id))
    ).subscribe({
      next: (resp) => {
        this.originTask = resp
      },
      error: (error) => {
        this.router.navigateByUrl('tasks')
      }
    })
  }
}
