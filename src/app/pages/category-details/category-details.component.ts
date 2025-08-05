import { ProductsService } from './../../core/services/product/products.service';
import { IProduct } from './../../shared/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-details',
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly cartService = inject(CartService)
  private readonly productsService = inject(ProductsService)
  private readonly toastrService = inject(ToastrService)

  products : IProduct[] = [];
  catId : string = '';

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res)=>{
        console.log(res);
        console.log(res.get('catId'));
        this.catId = res.get('catId')!
        this.getProductsByCategory()
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  getProductsByCategory() {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        // Filter products by category id
        this.products = res.data.filter((p: IProduct) => p.category._id === this.catId);
      },
      error: (err) => console.log(err)
    });
  }

  addProductToCart(productId:string){
    this.cartService.addProductToCart(productId).subscribe({
      next: (res)=>{
        console.log(res);
        this.toastrService.success(res.message);
      },
      error: (err)=>{
        console.log(err);
        this.toastrService.error(err.message);
      }
    })
  }
}
