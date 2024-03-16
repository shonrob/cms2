import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css',
})
export class MessageEditComponent {
  // to manipulate the DOM
  @ViewChild('subject') subjectInputRef: ElementRef;
  @ViewChild('msgText') msgTextInputRef: ElementRef;

  // eventEmitter to output the new message object up to the MessageListComponent
  @Output() addMessageEvent = new EventEmitter<Message>();

  originalMessage: Message;
  message: Message;

  currentSender: string = 'Shonda';
  editMode: boolean = false;
  id: string;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // METHODS

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }
      this.originalMessage = this.messageService.getaMessage(id);
      if (!this.originalMessage) {
        return;
      }
      this.editMode = true;
      this.message = JSON.parse(JSON.stringify(this.originalMessage));
    });
  }

  onSendMessage() {
    // const msgId = this.messageService.getNextId();
    const msgSubject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message(
      null,
      msgSubject,
      msgText,
      this.currentSender
    );
    if (this.editMode) {
      this.messageService.updateMessage(this.originalMessage, newMessage);
    } else {
      this.messageService.addMessage(newMessage);
    }
    this.router.navigate(['/messages']);
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
