import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';


@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {

  // to manipulate the DOM 
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;

  // eventEmitter to output the new message object up to the MessageListComponent 
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = 'Shonda';

  constructor(private messageService: MessageService) {}

  // METHODS 

  onSendMessage() {
    const msgId = this.messageService.getNextId();
    const msgSubject = this.subjectInputRef.nativeElement.value;
    const msgText= this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message(msgId, msgSubject, msgText, this.currentSender);
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';

    
  }
}



  // onSendMessage(){

  //   const subject = this.subjectInputRef.nativeElement.value;
  //   const msgText= this.msgTextInputRef.nativeElement.value;
    
  //   // const sender = this.senderInput.nativeElement.value;
  //   const newMessage = new Message('1', subject, msgText, this.currentSender );
  //   this.addMessageEvent.emit(newMessage);
  // }