import { Component } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  public newTask: Task = {
    id: '',
    title: '',
    description: '',
    completed: false,
    user_id: '',
  };

  addTask() {
    // Todo añadir funcionalidad de addTarea
    console.log(this.newTask);
  }
}
