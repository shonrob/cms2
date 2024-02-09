import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

    documents: Document[] = []

    constructor(private documentService: DocumentService) {}

    ngOnInIt(){
      this.documents = this.documentService.getDocuments();
    }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
