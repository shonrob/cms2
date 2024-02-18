import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent {
  // @Input() document: Document;
  document: Document;
  id: number;
  nativeWindow: any;

  
  constructor(  private documentService: DocumentService,
                private route: ActivatedRoute,
                private router: Router,
                private windRefService: WindRefService,
                ){

  }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.document = this.documentService.getDocument(this.id);
      this.nativeWindow = this.windRefService.getNativeWindow();
    })
  }

  onView(){
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete(){
    this.documentService.deleteDocument(this.document);
    this.router.navigateByUrl('/documents')
  }
  
}
