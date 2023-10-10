import { Component, Input, ViewChild } from '@angular/core';
import { ChatMessage } from '../parser/types';
import { FormControl } from '@angular/forms';
import { ProcessParser } from '../parser/process-parser';
import { SignatureFieldComponent } from '../signature-field/signature-field.component';

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

  deleteAnswer() {
    this.parser?.thread?.dataStore.delete(this.message!.associatedBlock!.id, this.control.value);
    const id = this.message!.associatedBlock!.id;
    const message = this.control.value;
    const itemToDelete = {[id]: message}
    fetch('http://localhost:1337/delete', {
      method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(itemToDelete)
      }).then((res) => res.json())
        .then((response) => {
          if (this.parser && response.success) {
            // do something
          }
        })

  }

}
