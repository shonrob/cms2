import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cms2';
  selectedFeature = 'document';

  switchView(selectedFeature: string) {
      this.selectedFeature = selectedFeature;
  }

  // Bro. Del Sol's code ANOTHER WAY to go about it.
  // switchView(selectedFeature: string) {
  //   if(this.selectedFeature?.toUpperCase() !== selectedFeature.toUpperCase()){
  //     this.selectedFeature = selectedFeature;
  //   }
  // }
}
