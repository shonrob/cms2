import { EventEmitter, Injectable } from '@angular/core';

import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

import { Observable, Subject } from 'rxjs';

import { NgFor } from '@angular/common';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  //Initialize the array
  private documents: Document[] = [];
  private maxDocumentId: number;
  private apiUrl = 'https://srobcms-default-rtdb.firebaseio.com/documents.json';

  //create the constructor
  constructor(private httpClient: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  // EVENTS
  // Create and event for docService
  documentSelectedEvent = new EventEmitter<Document>();

  // Changing a document like for the delete button
  documentChangedEvent = new EventEmitter<Document[]>();

  // documentListChangedEvent = new Subject<Document[]>();

  // METHODS

  // method to get the maxId
  getMaxId() {
    let maxId = 0;
    this.documents.forEach((doc) => {
      let currentId = parseInt(doc.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  //method to get a copy of all the documents
  // getDocuments(): Document[] {
  //   return this.documents.slice();
  // }

  getDocuments() {
    this.httpClient.get(`${this.apiUrl}`).subscribe({
      next: (documentsList: Document[]) => {
        this.documents = documentsList;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => a.name.localeCompare(b.name));
        const documentsListClone = this.documents.slice();
        this.documentChangedEvent.next(documentsListClone);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  // method to get a single document
  getaDocument(id: string): Document {
    return this.documents.find((theDocument) => theDocument.id === id);
  }

  // method to add a new document CALLED in the DOCUMENTEDITCOMPONENT WHEN SAVING DOCUMENT
  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  // method to delete a single document CALLED IN THE DOCUMENTDETAILCOMPONENT WHEN DELETE BUTTON IS USED
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  // method to update a document CALLED in the DOCUMENTEDITCOMPONENT WHEN SAVING CHANGES
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  storeDocuments() {
    const docString = JSON.stringify(this.documents);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.httpClient.put(`${this.apiUrl}`, docString, httpOptions).subscribe({
      next: () => {
        const documentsListClone = this.documents.slice();
        this.documentChangedEvent.next(documentsListClone);
      },
    });
  }
}
