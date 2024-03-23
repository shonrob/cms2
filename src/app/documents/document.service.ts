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
  private apiUrl = 'http://localhost:3000/documents';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

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
    // this.maxDocumentId++;
    newDocument.id = '';
    this.httpClient
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/documents',
        document,
        { headers: this.headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        // this.sortAndSend();
      });
  }

  // method to delete a single document CALLED IN THE DOCUMENTDETAILCOMPONENT WHEN DELETE BUTTON IS USED

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.httpClient
      .delete('http://localhost:3000/documents/' + document.id)
      .subscribe((response: Response) => {
        this.documents.splice(pos, 1);
        // this.sortAndSend();
      });
  }

  // method to update a document CALLED in the DOCUMENTEDITCOMPONENT WHEN SAVING CHANGES
  // updateDocument(originalDocument: Document, newDocument: Document) {
  //   if (!originalDocument || !newDocument) {
  //     return;
  //   }
  //   const pos = this.documents.indexOf(originalDocument);
  //   if (pos < 0) {
  //     return;
  //   }
  //   newDocument.id = originalDocument.id;
  //   this.documents[pos] = newDocument;
  //   this.storeDocuments();
  // }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    // update database
    this.httpClient
      .put(
        'http://localhost:3000/documents/' + originalDocument.id,
        newDocument,
        { headers: this.headers }
      )
      .subscribe((response: Response) => {
        this.documents[pos] = newDocument;
        // this.sortAndSend();
      });
  }

  // sortAndSend() {
  //   const docString = JSON.stringify(this.documents);
  //   const httpOptions = {
  //     headers: this.headers,
  //   };
  //   this.httpClient.put(`${this.apiUrl}`, docString, httpOptions).subscribe({
  //     next: () => {
  //       const documentsListClone = this.documents.slice();
  //       this.documentChangedEvent.next(documentsListClone);
  //     },
  //   });
  // }
}
