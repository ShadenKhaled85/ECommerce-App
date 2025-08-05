import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brand/brand.service';
import { IBrand } from '../../shared/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {

  private readonly brandsService = inject(BrandService)

  brands : IBrand [] = [];

  ngOnInit(): void {
    this.getBrands()
  }

  getBrands(){
    this.brandsService.getBrands().subscribe({
      next: (res)=>{
        console.log(res);
        this.brands = res.data;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

}
