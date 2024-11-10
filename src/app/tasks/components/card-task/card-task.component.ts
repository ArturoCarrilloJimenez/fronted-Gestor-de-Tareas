import { Component, Input } from '@angular/core';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.css'
})
export class CardTaskComponent {
  @Input() public task!: Task
}
