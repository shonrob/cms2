import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})

export class ContactListComponent  {

  // INITIALIZE CONTACT ARRAY
  contacts: Contact[] = [];
  contactId: string = '';

  // CONSTRUCTOR 
  constructor(private contactService: ContactService) {}
  

  // METHODS 
  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent.subscribe((contact: Contact[]) => {
      this.contacts = contact;
    })
  }

  // OnSelectedContact(contact: Contact) {
  //   this.contactService.contactSelectedEvent.emit(contact);
  // }



}

  // @Output() selectedContactEvent = new EventEmitter<Contact>();
  // line 17 is a method 
  // onSelected(contact: Contact) {
  //   // inside is the call...where the object contact is an argurment that is called to show up when clicked.
  //   // this.selectedContactEvent.emit(contact);
  // }