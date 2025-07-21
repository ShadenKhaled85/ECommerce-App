import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './../../core/services/flowbite/flowbite.service';
import { Component, input, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  constructor(private flowbiteService: FlowbiteService) {}

  // @Input() isLoggedIn: boolean = true;
  isLoggedIn = input<boolean>(true);

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}

