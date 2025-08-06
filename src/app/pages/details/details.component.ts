import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/product/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)

  productId : string = '';
  productDetails : IProduct | null = null;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res)=>{
        // console.log(res.get('id'));
        this.productId = res.get('id')!
        this.productService.getSpecificProduct(this.productId).subscribe({
          next: (res)=>{
            // console.log(res);
            this.productDetails = res.data
            console.log(this.productDetails);
          }
        })
      },
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
