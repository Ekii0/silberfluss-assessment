import { Component, Input } from '@angular/core';
import { ChatMessage } from '../parser/types';
import { FormControl } from '@angular/forms';
import { ProcessParser } from '../parser/process-parser';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  @Input() message?: ChatMessage;

  @Input() last: boolean = false;

  @Input() parser?: ProcessParser;

  control = new FormControl();

  sendAnswer() {
    this.parser?.reply({
      content: {
        value: this.control.value
      },
      id: `${this.message?.id}_reply`
    });
  }

}
