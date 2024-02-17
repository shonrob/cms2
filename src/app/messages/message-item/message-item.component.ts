import { Component, Input } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent {
  @Input() message: Message;

  // VARIABLES 
  messageSender: string;

  // CONSTRUCTOR 
  constructor(private contactService: ContactService) {}

// METHODS 
  ngOnInit(): void {
    const contact: Contact = this.contactService.getaContact(this.message.sender);
    this.messageSender = contact.name;
  }

  

}
 