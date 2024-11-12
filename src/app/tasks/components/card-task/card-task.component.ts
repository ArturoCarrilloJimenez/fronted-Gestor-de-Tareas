import { Component, Input } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'task-card-task',
  standalone: true,
  imports: [],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.css'
})
export class CardTaskComponent {
  constructor (private router: Router) {}

  @Input() public task!: Task

  edit(id: string) {
    this.router.navigateByUrl(`tasks/${id}`)
  }
}
