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
    this.getCartCountItems();

    this.getLoggedUserCart();

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  getCartCountItems(){
    // this.cartCountItems = this.cartService.cartCountItems;
    this.cartService.cartCountItems.subscribe({
          next:(value)=>{
            console.log(value);
            this.cartCountItems = value;
          }
        })
  }

  getLoggedUserCart(){
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res);
        this.cartService.cartCountItems.next(res.numOfCartItems);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  signOut(){
    this.authService.signOut()
  }
}

