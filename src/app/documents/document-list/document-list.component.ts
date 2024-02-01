import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
    documents: Document[] = [
      new Document('1', 'Document Name', 'Document Description', 'URL String', null),
      new Document('2', 'Document Name2', 'Document Description2', 'URL String2', null)
    ]

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
