import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './../../core/services/flowbite/flowbite.service';
import { Component, input, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  constructor(private flowbiteService: FlowbiteService, private authService : AuthService) {}

  // @Input() isLoggedIn: boolean = true;
  isLoggedIn = input<boolean>(true);
  isMenuOpen = false;
  isDesktop = false;

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  signOut(){
    this.authService.signOut()
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}

