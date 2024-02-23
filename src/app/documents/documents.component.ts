import { Component, OnDestroy, OnInit } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent implements OnInit, OnDestroy {

  // INITIALIZE 
  selectedDocument: Document;
  
  private subscription: Subscription;

  // CONSTRUCTOR 
  constructor(private documentService: DocumentService) {}
  

  // METHODS 
  ngOnInit(): void {
    this.subscription = this.documentService.documentSelectedEvent.subscribe((document: Document) => {
      this.selectedDocument = document;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
