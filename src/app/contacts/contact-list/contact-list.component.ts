import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})

export class ContactListComponent implements OnInit, OnDestroy {

  // INITIALIZE CONTACT ARRAY
  contacts: Contact[] = [];
  contactId: string = '';

  private clSubscription: Subscription;

  // CONSTRUCTOR 
  constructor(private contactService: ContactService) {}
  

  // METHODS 
  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.clSubscription = this.contactService.contactChangedEvent.subscribe((contact: Contact[]) => {
      this.contacts = contact;
    })
  }

  ngOnDestroy(): void {
    this.clSubscription.unsubscribe();
  }
  

}
