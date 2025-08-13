import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ICartItem } from '../../shared/interfaces/icart-item';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

  private readonly wishlistService = inject(WishlistService)
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)

  wishlistProducts : IProduct[] = [];
  cartItems : ICartItem[] = [];

  ngOnInit(): void {
    this.getUserWishlist()
  }

  getUserWishlist(){
    this.wishlistService.getUserWishlist().subscribe({
      next: (res)=>{
        console.log(res.data);
        this.wishlistProducts = res.data;
      }
    })
  }

  addProductToCart(productId:string){
    this.cartService.addProductToCart(productId).subscribe({
      next: (res)=>{
        console.log(res);
        this.toastrService.success(res.message, 'Cart', {progressBar:true});
        this.removeProductFromWishlist(productId);
      }
    })
  }

  removeProductFromWishlist(productId: string) {
    this.wishlistService.removeProductFromWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success(res.message, 'Wishlist', { progressBar: true });

        // Remove product when added to cart
        this.wishlistProducts = this.wishlistProducts.filter(
          (product) => product._id !== productId
        );
      }
    })
  }
}

