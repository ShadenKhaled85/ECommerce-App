import { CategoriesService } from '../../core/services/category/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from './../../core/services/product/products.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  /* =================== Products & Categories ================= */

  myProducts : IProduct[] = [];
  myCategories : ICategory[] = [];

  private readonly productsService = inject(ProductsService)
  private readonly categoriesService = inject(CategoriesService)

  callProducts(){
    this.productsService.getProducts().subscribe({
      next: (res)=> {
        console.log(res.data);
        this.myProducts = res.data
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  callCategories(){
    this.categoriesService.getCategories().subscribe({
      next: (res)=> {
        console.log(res.data);
        // this.myProducts = res.data
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.callProducts()
    this.callCategories()
  }


}
