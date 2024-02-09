import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent {
  // @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}
  
  // line 17 is a method 
  onSelected(contact: Contact) {
    // inside is the call...where the object contact is an argurment that is called to show up when clicked.
    // this.selectedContactEvent.emit(contact);
    this.contactService.contactSelectedEvent.emit(contact);
  }


  ngOnInIt(): void {
    this.contacts = this.contactService.getContacts();
  }
}
