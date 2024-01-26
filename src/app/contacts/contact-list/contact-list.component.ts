import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [
    new Contact('1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg', null),
    new Contact('2', 'Rex Barzee', 'barzeer@byu.edu', '208-497-3768', '../../assets/images/barzeer.jpg', null)
  ];
  
  // line 17 is a method 
  onSelected(contact: Contact) {
    // inside is the call...where the object contact is an argurment that is called to show up when clicked.
    this.selectedContactEvent.emit(contact);
  }
  // constructor() {}

  // ngOnInIt() {}
}
