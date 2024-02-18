import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  //Initialize the array
  private documents: Document[] = []

  //create the constructor
  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  // EVENTS 
  // Create and event for docService 
  documentSelectedEvent = new EventEmitter<Document[]>()
  documentChangedEvent = new EventEmitter<Document[]>()

  // METHODS 
  //method to get a copy of all the documents
  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(index: number) {
    return this.documents[index];
  }
  //method to get a single document
  getaDocument(id: string): Document {
    return this.documents.find((theDocument) => theDocument.id === id);
  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
 }


}
