import { Component} from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  contact: Contact;
  id: string;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInIt() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.contact = this.contactService.getaContact(this.id);
      // console.log(params);
      console.log(params.id);
      console.log(this.id);
    }); 
  }

  // onDelete() {
  //   this.contactService.deleteContact(this.contact);
  //   this.router.navigate(this.contact.id);
  // }
}

// (['/contacts'])
