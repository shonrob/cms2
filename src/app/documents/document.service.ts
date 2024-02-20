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
  documentSelectedEvent = new EventEmitter<Document>()

  // Changing a document like for the delete button
  documentChangedEvent = new EventEmitter<Document[]>()

  // METHODS 
  //method to get a copy of all the documents
  getDocuments(): Document[] {
    return this.documents.slice();
  }

  // method to get a single document
  getaDocument(id: string): Document {
    return this.documents.find((theDocument) => theDocument.id === id);
  }

  // method to delete a single document 
  deleteDocument(document: Document){
    if(!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if(pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }
  // getDocument(index: number) {
  //   return this.documents[index];
  // }


}
