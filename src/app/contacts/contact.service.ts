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
    private maxContactId: number;


  // CONSTRUCTOR 
  constructor() {
    this.contacts = MOCKCONTACTS; 
    this.maxContactId = this.getMaxContactId();
    // console.log(this.contacts);
   }

  // EVENTS 
  // Create an event for contact service 
  contactSelectedEvent = new EventEmitter<Contact>()

  // Change a contact 
  contactChangedEvent = new EventEmitter<Contact[]>()

  contactListChangedEvent = new Subject<Contact[]>()

  //  METHODS 

  // method to get the max contact id 
  getMaxContactId() {
    let contactId = 0;
    this.contacts.forEach((contact) => {
      let currentId = parseInt(contact.id);
      if( currentId > contactId) {
        contactId = currentId;
      }
    });
    return contactId;
  }

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

  //  method to add a new contact 
   addContact(newContact: Contact) {
    if(!newContact) {
      return 
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    const contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
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
    const contactsListClone = this.contacts.slice();
    this.contactChangedEvent.next(contactsListClone);
   }

  //  method to update contacts 
   updateContact(orginalContact: Contact, newContact: Contact) {
    if(!orginalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(orginalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = orginalContact.id;
    this.contacts[pos] = newContact;
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
   }
}


  //  onSelected(contact: Contact) {
  //   // inside is the call...where the object contact is an argurment that is called to show up when clicked.
  //   // this.selectedContactEvent.emit(contact);
  //   this.contactSelectedEvent.emit(contact);
  // }