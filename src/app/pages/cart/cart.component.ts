import { ICartItem } from './../../shared/interfaces/icart-item';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService)

  cartItems : ICartItem = {} as ICartItem;

  ngOnInit(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartItems = res.data
      }
    })
  }

  removeCartItem(productId:string) : void {
    this.cartService.removeCartItem(productId).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartItems = res.data
        this.cartService.cartCountItems.next(res.numOfCartItems);
      }
    })
  }

  updateCartItemQuantity(productId: string, quantity: any){
    this.cartService.updateCartProductQuantity(productId,quantity).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartItems = res.data
      }
    })
  }

  clearUserCart(){
    this.cartService.clearUserCart().subscribe({
      next:(res)=>{
        console.log(res);
        this.cartItems = {} as ICartItem;
        this.cartService.cartCountItems.next(0);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
