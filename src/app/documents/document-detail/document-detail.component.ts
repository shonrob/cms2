import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent {
  // @Input() document: Document;
  document: Document;
  id: number;

  
  constructor(  private documentService: DocumentService,
                private route: ActivatedRoute,
                private router: Router){

  }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.document = this.documentService.getDocument(this.id);
    })
  }
  
}
