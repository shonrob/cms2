// ANGULAR IMPORTS 
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

// COMPONENTS IMPORTS
import { Document } from '../document.model';
import { DocumentService } from '../document.service';


@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent {
  document: Document;
  id: number;

  // CONSTRUCTOR 
  constructor(private documentService: DocumentService,
              private route: ActivatedRoute,
              private router: Router, 
              ){}

  NgOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.document = this.documentService.getDocument(this.id);
    });

  }
  
} 
