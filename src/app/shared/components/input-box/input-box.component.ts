import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'shared-input-box',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './input-box.component.html',
  styleUrl: './input-box.component.css'
})
export class InputBoxComponent implements OnChanges {
  @Input() public title: string = '';
  @Input() public placeholder: string = '';
  @Input() public value: string = '';
  @Input() public type: string = '';
  @Input() public error: string = ''

  public defaultValue: string = ''

  @Output()
  public emitValue: EventEmitter<string> = new EventEmitter()

  // Si cambia el valor se lo paso al valor del input y lo envió con el eventEmitter
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.defaultValue = this.value
    }
    this.onValue()
  }

  onValue () {
    this.emitValue.emit(this.defaultValue);
  }
}
