import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

export class AddTaskComponent implements OnChanges {
  @Output()
  public emitter: EventEmitter<boolean> = new EventEmitter();

  @Input() public task: Task | null = null;

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      this.newTask = { ...this.task! };
    }
  }

  public error: ErrorInterface | null = null;

  public newTask: Task = {
    id: '',
    title: '',
    description: '',
    completed: false,
    user_id: 'ca9ba32d-22f6-4b50-b304-b1b9def3c090',
  };

  // TODO hacer las validaciones y mostrar errores
  addTask() {
    if (this.newTask.title === '') {
      this.error = { detail: 'Introduce un titulo' };
      return;
    }

    this.taskService.addTask(this.newTask).subscribe({
      next: () => {
        this.taskService.searchAllTasks();
        this.emitter.emit(true);
      },
      error: (error) => {
        this.error = error;
      },
    });
  }

  updateTask() {
    if (this.newTask.title === '') {
      this.error = { detail: 'Introduce un titulo' };
      return;
    }

    this.taskService.updateTask(this.newTask).subscribe({
      next: () => {
        this.taskService.updateTask(this.task!);
        this.router.navigateByUrl('tasks')
      },
      error: (error) => {
        this.error = error;
      },
    });
  }
}
