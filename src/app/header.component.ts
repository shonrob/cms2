import { Component } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  //these two variables navigate the toggling of the nav bar 
  isUserDropdownOpen: boolean = false;
  isNavbarCollapsed: boolean = true;

    // these are the methods for toggling the nav bar 
    toggleUserDropdown() {
      this.isUserDropdownOpen = !this.isUserDropdownOpen;
    }
  
    toggleNavbar() {
      this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }
}
