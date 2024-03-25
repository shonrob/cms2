import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent implements OnInit, OnDestroy {
  // @Output() selectedDocumentEvent = new EventEmitter<Document>();

  subscription: Subscription;

  // INITIALIZE DOCUMENT ARRAY
  documents: Document[] = [];
  documentId: string = '';

  // CONSTRUCTOR
  constructor(private documentService: DocumentService) {}

  // METHODS
  ngOnInit() {
    this.documentService.getDocuments();
    this.subscription = this.documentService.documentChangedEvent.subscribe(
      (document: Document[]) => {
        this.documents = document;
      }
    );
    // console.log(this.documents);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
