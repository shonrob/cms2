import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  //  INITIALIZE THE ARRAY
  private contacts: Contact[] = [];
  private maxContactId: number;
  private apiUrl = 'http://localhost:3000/server/contacts';

  // CONSTRUCTOR
  constructor(private httpClient: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxContactId();
    // console.log(this.contacts);
  }

  // EVENTS
  // Create an event for contact service
  contactSelectedEvent = new EventEmitter<Contact>();

  // Change a contact
  contactChangedEvent = new EventEmitter<Contact[]>();

  // contactListChangedEvent = new Subject<Contact[]>()

  //  METHODS

  // method to get the max contact id
  getMaxContactId() {
    let contactId = 0;
    this.contacts.forEach((contact) => {
      let currentId = parseInt(contact.id);
      if (currentId > contactId) {
        contactId = currentId;
      }
    });
    return contactId;
  }

  getContacts() {
    this.httpClient.get<Contact[]>(`${this.apiUrl}`).subscribe({
      next: (contactsList: any) => {
        this.contacts = contactsList.contacts;
        console.log(contactsList);
        // this.maxContactId = this.getMaxContactId();
        this.sortAndSend(this.contacts);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  sortAndSend(contactList = this.contacts) {
    contactList.sort((a, b) => a.name.localeCompare(b.name));
    const contactsListClone = contactList.slice();
    this.contactChangedEvent.next(contactsListClone);
  }

  //  This method returns a contact that has a matching id.
  getaContact(id: string): Contact {
    // console.log(this.contacts);
    // console.log(id);

    return this.contacts.find((theContact) => theContact.id === id);
  }

  //  method to add a new contact CALLED in the CONTACTEDITCOMPONENT WHEN SAVING CONTACT
  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  // Method to delete a contact CALLED IN THE CONTACTDETAILCOMPONENT WHEN DELETE BUTTON IS USED
  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  //  method to update contacts CALLED in the CONTACTEDITCOMPONENT WHEN SAVING CHANGES
  updateContact(orginalContact: Contact, newContact: Contact) {
    if (!orginalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(orginalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = orginalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  storeContacts() {
    const contactString = JSON.stringify(this.contacts);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.httpClient
      .put(`${this.apiUrl}`, contactString, httpOptions)
      .subscribe({
        next: () => {
          const contactsListClone = this.contacts.slice();
          this.contactChangedEvent.next(contactsListClone);
        },
      });
  }
}
