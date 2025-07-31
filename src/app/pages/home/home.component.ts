import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/category/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { IProduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from './../../core/services/product/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink, CurrencyPipe, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  myProducts : IProduct[] = [];
  myCategories : ICategory[] = [];

  searchItem : string = '';

  private readonly productsService = inject(ProductsService)
  private readonly categoriesService = inject(CategoriesService)

    customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000, // 3 secs
    autoplayHoverPause: true,
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
        items: 6
      }
    },
    nav: true
  }

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 2000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''], // previous and next
    items: 1,
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
      },
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
