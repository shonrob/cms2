import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {

  // VARIABLES 
  orginalContact: Contact;
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
    this.orginalContact = this.contactService.getaContact('id');
    if(this.orginalContact === undefined || this.orginalContact === null) {
      return;
    }
    this.editMode = true;
    this.contact = JSON.parse(JSON.stringify(this.orginalContact));
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
    this.contactService.updateContact(this.orginalContact, newContact);
  }
  this.router.navigate(['/contacts'])
}

onCancel(){
  this.router.navigate(['../'], {relativeTo: this.route});
}

}
