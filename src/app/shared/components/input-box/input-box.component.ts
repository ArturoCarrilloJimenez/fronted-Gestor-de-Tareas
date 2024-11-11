import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-input-box',
  standalone: true,
  imports: [],
  templateUrl: './input-box.component.html',
  styleUrl: './input-box.component.css'
})
export class InputBoxComponent {
  @ViewChild('inputText')
  term!: ElementRef<HTMLInputElement>;

  @Input() public title: string = '';
  @Input() public placeholder: string = '';
  @Input() public value: string = '';

  @Output()
  public emitValue: EventEmitter<string> = new EventEmitter()

  onValue () {
    this.emitValue.emit(this.term.nativeElement.value);
  }

}
