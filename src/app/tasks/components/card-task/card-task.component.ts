import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { SweetalertService } from '../../../shared/services/sweetalert.service';

@Component({
  selector: 'task-card-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.css'],
})
export class CardTaskComponent {
  constructor(
    private router: Router,
    private taskService: TaskService,
    private sweetAlert: SweetalertService
  ) {}

  @Input() public task!: Task;
  @Input() public editTask: boolean = false;

  edit(id: string) {
    this.router.navigateByUrl(`tasks/${id}`);
  }

  changeState() {
    const newTask: Task = this.task;
    newTask.completed = !newTask.completed;

    this.taskService.updateTask(newTask).subscribe();
  }

  async deleteTask(id: string) {
    const isConfirm = await this.sweetAlert.alertConfirm(
      'Eliminar tarea',
      'Estas seguro que quieres eliminar la tarea',
      'Eliminar'
    );

    if (isConfirm) {
      this.taskService.deleteTask(id);
      
      if (this.editTask) this.router.navigateByUrl('tasks');
      else this.taskService.searchAllTasks();
    }
  }
}
