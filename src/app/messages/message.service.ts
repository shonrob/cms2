import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // INITIALIZE THE ARRAY 
  private messages: Message[] = []

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
}
