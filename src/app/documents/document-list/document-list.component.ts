import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  // @Output() selectedDocumentEvent = new EventEmitter<Document>();

  // INITIALIZE DOCUMENT ARRAY
  documents: Document[] = []
  documentId: string = '';

    // CONSTRUCTOR 
  constructor(private documentService: DocumentService) {}

    // METHODS 
  ngOnInit(){
      this.documents = this.documentService.getDocuments();
      this.documentService.documentChangedEvent.subscribe((document: Document[]) => {
        this.documents = document;
      })
    }

  // onSelectedDocument(document: Document) {
  //   this.documentService.documentSelectedEvent.emit(document);
  // }

}
