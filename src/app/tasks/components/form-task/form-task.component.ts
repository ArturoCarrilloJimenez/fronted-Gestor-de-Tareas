import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task.interface';
import { InputBoxComponent } from '../../../shared/components/input-box/input-box.component';
import { ErrorInterface } from '../../interfaces/error';

@Component({
  selector: 'task-form-task',
  standalone: true,
  imports: [FormsModule, InputBoxComponent, CommonModule],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.css',
})

// TODO Hacer genérico el form
export class AddTaskComponent {
  @Output()
  public emitter: EventEmitter<boolean> = new EventEmitter()

  constructor(private taskService: TaskService) {}

  public error: ErrorInterface | null = null;

  public newTask: Task = {
    id: '',
    title: '',
    description: '',
    completed: false,
    user_id: 'ca9ba32d-22f6-4b50-b304-b1b9def3c090',
  };


  addTask() {
    if (this.newTask.title === '') {
      this.error = {detail: 'Introduce un titulo'}
      return
    }

    this.taskService.addTask(this.newTask).subscribe({
      next: () => {
        this.taskService.searchAllTasks()
        this.emitter.emit(true)
      },
      error: (error) => {
        this.error = error
      },
    });
  }
}
