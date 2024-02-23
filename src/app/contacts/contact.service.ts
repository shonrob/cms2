import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService  {

    //  INITIALIZE THE ARRAY 
    private contacts: Contact[] = [];

  // CONSTRUCTOR 
  constructor() {
    this.contacts = MOCKCONTACTS; 
    // console.log(this.contacts);
   }

  // EVENTS 
  // Create an event for contact service 
  contactSelectedEvent = new EventEmitter<Contact>()

  // Change a contact 
  contactChangedEvent = new EventEmitter<Contact[]>()

  contactListChangedEvent = new Subject<Contact[]>()

  //  METHODS 
   //This method returns a copy of the contact list
   getContacts(): Contact[] {
    return this.contacts.slice();
   }

  //  This method returns a contact that has a matching id. 
   getaContact(id: string): Contact {
    // console.log(this.contacts);
    // console.log(id);

    return this.contacts.find((theContact) => theContact.id === id);
  
   }

// Method to delete a contact 
   deleteContact(contact: Contact) {
    if(!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if(pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
   }

  // onSelected(contact: Contact) {
  //   this.contactSelectedEvent.emit(contact);
  // }

}

  //  onSelected(contact: Contact) {
  //   // inside is the call...where the object contact is an argurment that is called to show up when clicked.
  //   // this.selectedContactEvent.emit(contact);
  //   this.contactSelectedEvent.emit(contact);
  // }