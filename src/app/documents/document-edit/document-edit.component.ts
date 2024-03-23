import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css',
})
export class DocumentEditComponent implements OnInit {
  // VARIABLES
  // Unedit document
  originalDocument: Document;
  //editedVersion of the document from the form
  document: Document;
  //indicates whether an existing doument has been edited, or a new document is being created.
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // METHODS
  // determing if we are editing an existing document or creating a new document
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentService.getaDocument(id);
      if (!this.originalDocument) {
        return;
      }
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  // called when the user selects the save button and submits the form. It will either add the new document to the document list or update the existing doucment in the document List.
  onSubmit(form: NgForm) {
    let value = form.value; //retrieving the value the user inputs in the forms field
    let newDocument = new Document(
      null,
      null,
      value.name,
      value.description,
      value.url
    );
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }

  // cancel the form and route back to the main documents component.
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // addNewDocument() {
  //   this.documentService.addDocument()
  // }
}
