import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

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
  contactSelectedEvent = new EventEmitter<Contact>()

  //  METHODS 
   //This method returns a copy of the contact list
   getContacts(): Contact[] {
    return this.contacts.slice();
   }

  //  This method returns a contact that has a matching id. 
   getaContact(id: string): Contact {
    return this.contacts.find((theContact) => theContact.id === id);
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