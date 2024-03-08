import { EventEmitter, Injectable, Output } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // INITIALIZE THE ARRAY
  private messages: Message[] = [];
  private maxMessageId: number;
  private apiUrl = 'https://srobcms-default-rtdb.firebaseio.com/messages.json';

  @Output() messageChangedEvent = new EventEmitter<Message[]>();

  // CREATE CONSTRUCTOR
  constructor(private httpClient: HttpClient) {
    this.messages = MOCKMESSAGES;
  }

  // METHODS
  getMaxId() {
    let maxId = 0;
    this.messages.forEach((message) => {
      let currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  getMessages() {
    this.httpClient.get(`${this.apiUrl}`).subscribe({
      next: (messagesList: Message[]) => {
        this.messages = messagesList;
        this.maxMessageId = this.getMaxId();
        const messagesListClone = this.messages.slice();
        this.messageChangedEvent.next(messagesListClone);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  getaMessage(id: string): Message {
    return this.messages.find((theMessage) => theMessage.id === id);
  }

  addMessage(messages: Message) {
    this.messages.push(messages);
    this.storeMessages();
  }

  storeMessages() {
    const messageString = JSON.stringify(this.messages);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.httpClient
      .put(`${this.apiUrl}`, messageString, httpOptions)
      .subscribe({
        next: () => {
          const messagesListClone = this.messages.slice();
          this.messageChangedEvent.next(messagesListClone);
        },
      });
  }
}
