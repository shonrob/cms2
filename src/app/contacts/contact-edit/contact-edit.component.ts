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
  if(event.previousContainer !==event.container) {
    const contactCopy = {...event.item.data };
    this.groupContacts.push(contactCopy);
  }
}

// isInvalidContact(newContact: Contact) {
//   if(!newContact) {
//     return true;
//   }
//   if(this.contact && newContact.id === this.contact.id) {
//     return true;
//   }
//   for(let i = 0; i <this.groupContacts.length; i++) {
//     if(newContact.id === this.groupContacts[i].id) {
//       return true;
//     }
//   }
//   return false;
// }

}
