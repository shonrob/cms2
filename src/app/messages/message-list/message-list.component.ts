import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(1, 'WDD430', 'Hooray, We made it', 'Paul'),
    new Message(2, 'Math', 'Crazy!', 'Suzy'),
    new Message(3, 'Science', 'Again', 'Simon'),
  ]
  // newMessageAdded(message: Message) {
    
  // }
  constructor() {}

  ngOnInit(): void {
    
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
