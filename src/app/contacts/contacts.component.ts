import { Component } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
  // providers: [ContactService]
})
export class ContactsComponent {
  selectedContact: Contact;

  constructor(private contactService: ContactService) {

  }

  ngOnInIt() {
    this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
      this.selectedContact = contact;
    });
  }
  
}
 