import { EventEmitter, Injectable, Output } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // INITIALIZE THE ARRAY 
  private messages: Message[] = []

  @Output() messageChangedEvent = new EventEmitter<Message[]>();

  // CREATE CONSTRUCTOR 
  constructor() { 
    this.messages = MOCKMESSAGES;
  }

  // METHODS 
  getMessages(): Message[] {
    return this.messages.slice();
  }

  getaMessage(id: string): Message {
    return this.messages.find((theMessage) => theMessage.id === id);
  }

  addMessage (messages: Message) {
    this.messages.push(messages);
    this.messageChangedEvent.emit(this.messages.slice());
  }

  getNextId(): string {
    return (this.messages.length > 1)? ''+(Number(this.messages[this.messages.length - 1].id) + 1) : '0';
  }
}
