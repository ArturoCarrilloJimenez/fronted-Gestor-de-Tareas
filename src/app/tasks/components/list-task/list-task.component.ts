import { Task } from './../../interfaces/task.interface';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CardTaskComponent } from '../card-task/card-task.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'task-list-task',
  standalone: true,
  imports: [CardTaskComponent, CommonModule],
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css',
})
export class ListTaskComponent implements OnChanges {
  @Input() public listTask!: Task[];

  public isEmploy: boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listTask']) {
      this.isEmploy = this.listTask.length == 0;
    }
  }
}
