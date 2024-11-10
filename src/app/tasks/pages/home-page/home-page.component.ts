import { Component } from '@angular/core';
import { ListTaskComponent } from '../../components/list-task/list-task.component';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { AddTaskComponent } from '../../components/add-task/add-task.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ListTaskComponent, AddTaskComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  public isGetTarea: boolean = true;

  constructor(private taskService: TaskService) {
    this.taskService.searchTask();
  }

  public get listTask(): Task[] {
    return this.taskService.taskList;
  }

  addTask() {
    this.isGetTarea ? this.isGetTarea = false : this.isGetTarea = true;
  }
}
