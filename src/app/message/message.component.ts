import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div class="ui-message ui-messages-error"
         *ngIf="hasError()">
      {{ text }}
    </div>
  `,
  styles: [
    `.ui-messages-error {
      font-weight: bold;
      border-width: 0;

      margin: 0;
      margin-top: 4px;
      padding: 0;
      padding-left: 0.5em;
      color: #F00;
    }`
  ]
})
export class MessageComponent {

  @Input() control: FormControl;
  @Input() error: string;
  @Input() text: string;

  hasError(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
