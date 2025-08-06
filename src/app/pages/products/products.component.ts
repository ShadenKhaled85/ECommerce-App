import { CartService } from './../../core/services/cart/cart.service';
import { IProduct } from './../../shared/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/product/products.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)

  products : IProduct[] = [];
  productId : string = '';

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.productsService.getProducts().subscribe({
      next:(res)=>{
        console.log(res);
        this.products = res.data;
      }
    })
  }

  addProductToCart(productId:string){
    this.cartService.addProductToCart(productId).subscribe({
      next: (res)=>{
        console.log(res);
        this.toastrService.success(res.message);
      }
    })
  }
}
