// ANGULAR IMPORTS 
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

// COMPONENTS IMPORTS
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';


@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent {
  document: Document;
  id: string;
  nativeWindow: any;

  // CONSTRUCTOR 
  constructor(private documentService: DocumentService,
              private windowRefService: WindRefService,
              private route: ActivatedRoute,
              private router: Router, 
              ){}

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.document = this.documentService.getaDocument(this.id);
    });
  }

onView() {
  this.nativeWindow = this.windowRefService.getNativeWindow();
  if (this.document.url) {
    this.nativeWindow.open(this.document.url);
  }
}


  
} 
