import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactSelectedEvent = new EventEmitter<Contact>();

  private contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS; 
    // console.log(this.contacts);
   }

   //This method returns a copy of the contact list
   getContacts(): Contact[] {
    return this.contacts.slice();
   }

  //  This method returns a contact that has a matching id. 
   getAContact(id: string): Contact {
    return this.contacts.find((theContact) => theContact.id === id);
   }

   onSelected(contact: Contact) {
    // inside is the call...where the object contact is an argurment that is called to show up when clicked.
    // this.selectedContactEvent.emit(contact);
    this.contactSelectedEvent.emit(contact);
  }

}
