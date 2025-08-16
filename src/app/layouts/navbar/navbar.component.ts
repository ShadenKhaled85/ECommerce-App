import { CartService } from './../../core/services/cart/cart.service';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './../../core/services/flowbite/flowbite.service';
import { Component, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  constructor(
    private flowbiteService: FlowbiteService,
    private authService : AuthService,
    private cartService : CartService,
  ) {}

  // @Input() isLoggedIn: boolean = true;
  isLoggedIn = input<boolean>(true);
  isMenuOpen : boolean = false
  cartCountItems : number = 0;

  ngOnInit(): void {
    // this.cartCountItems = this.cartService.cartCountItems;
    this.cartService.cartCountItems.subscribe({
      next:(value)=>{
        console.log(value);
        this.cartCountItems = value;
      }
    }) ;

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  signOut(){
    this.authService.signOut()
  }
}

