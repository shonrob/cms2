import { Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private documents: Document[] = []

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getaDocument(id: string): Document {
    return this.documents.find((theDocument) => theDocument.id === id);
  }
}
