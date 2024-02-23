import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent implements OnInit, OnDestroy{

  // INITIALIZE 
  selectedContact: Contact;
  private subscription: Subscription;

  // CONSTRUCTOR 
  constructor(private contactService: ContactService) {}

  // METHODS 
  ngOnInit(): void {
    this.subscription = this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
      this.selectedContact = contact;
    });
  } 

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
  