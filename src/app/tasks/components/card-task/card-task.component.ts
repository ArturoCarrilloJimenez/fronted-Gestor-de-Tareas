import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'task-card-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.css'
})
export class CardTaskComponent {
  constructor (private router: Router, private taskService: TaskService) {}

  @Input() public task!: Task

  edit(id: string) {
    this.router.navigateByUrl(`tasks/${id}`)
  }

  changeState() {
    const newTask: Task = this.task
    newTask.completed = !newTask.completed

    this.taskService.updateTask(newTask).subscribe()
  }
}
