import { Component } from '@angular/core';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent {

constructor( private documentService: DocumentService) {

}

// addNewDocument() {
//   this.documentService.addDocument()
// }

}