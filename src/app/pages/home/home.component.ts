import { CategoriesService } from '../../core/services/category/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from './../../core/services/product/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  imports: [CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  myProducts : IProduct[] = [];
  myCategories : ICategory[] = [];
  showCarousel = false;

  private readonly productsService = inject(ProductsService)
  private readonly categoriesService = inject(CategoriesService)

    customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''], // previous and next
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  }

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
        this.myCategories = res.data
      // Force micro delay to allow DOM to update
          setTimeout(() => {
            this.showCarousel = true;
          }, 0);      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
      this.callProducts();
      this.callCategories();
  }

}
