import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {

  // VARIABLES 
  originalContact: Contact;
  contact: Contact;

  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  errorMessage: string = '';


constructor ( private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) {
  
}

ngOnInit(): void {
  this.route.params.subscribe((params: Params) => {
    let id = params['id'];
    if(id === undefined || id === null) {
      this.editMode = false;
      return;
    }
    this.originalContact = this.contactService.getaContact(id);
    if(this.originalContact === undefined || this.originalContact === null) {
      return;
    }
    this.editMode = true;
    this.contact = JSON.parse(JSON.stringify(this.originalContact));
    if(!!this.contact.group){
        this.groupContacts = this.contact.group;
    }
  });
}

onSubmit(form: NgForm) {
  let value = form.value;
  let newContact = new Contact(
    null,
    value.name,
    value.email,
    value.phone,
    value.imageUrl,
    value.groupContacts
  );
  // console.log(newContact.group);
  newContact.group = this.groupContacts;
  if(this.editMode) {
    this.contactService.updateContact(this.originalContact, newContact);
  } else {
    this.contactService.addContact(newContact);
  }
  this.router.navigate(['/contacts'])
}

onCancel(){
  this.router.navigate(['../'], {relativeTo: this.route});
}

onDrop(event : CdkDragDrop<Contact[]>) {
  if(!this.isInvalidContact(event.item.data) && event.previousContainer !==event.container) {
    const contactCopy = {...event.item.data };
    this.groupContacts.push(contactCopy);
  }
  // console.log(this.groupContacts);
}

isInvalidContact(newContact: Contact) {
  if(!newContact) {
    this.errorMessage = '';
    return true;
  }
  if(this.contact && newContact.id === this.contact.id) {
    this.errorMessage = "Cannot add this contact to their own group."
    return true;
  }
  for(let i = 0; i <this.groupContacts.length; i++) {
    if(newContact.id === this.groupContacts[i].id) {
      this.errorMessage = "Cannot duplicate this contact to this group again."
      return true;
    }
  }
  this.errorMessage = '';
  return false;
}



onRemoveItem(index: number) {
  if (index < 0 || index >= this.groupContacts.length) {
     return;
  }
  this.groupContacts.splice(index, 1);
}

}
