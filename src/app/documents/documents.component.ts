import { Component } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {

  // INITIALIZE 
  selectedDocument: Document;
  
  // CONSTRUCTOR 
  constructor(private documentService: DocumentService) {}
  

  // METHODS 
  ngOnInit(): void {
    this.documentService.documentSelectedEvent.subscribe((document: Document) => {
      this.selectedDocument = document;

    this.documentService.documentChangedEvent.subscribe((document1: Document) => {
      this.selectedDocument = document1;
    })
    })
  }

}
