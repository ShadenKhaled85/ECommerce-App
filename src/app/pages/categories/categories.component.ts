import { RouterLink } from '@angular/router';
import { CategoriesService } from './../../core/services/category/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { ICategory } from '../../shared/interfaces/icategory';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  private readonly categoriesService = inject(CategoriesService)

  categories : ICategory[] = [];

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(){
    this.categoriesService.getCategories().subscribe({
      next: (res)=>{
        console.log(res);
        this.categories = res.data;
      }
    })
  }

}
