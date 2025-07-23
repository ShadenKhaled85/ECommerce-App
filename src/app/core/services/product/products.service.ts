import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private httpClient: HttpClient) { }

  getProducts() : Observable<any>{
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  getSpecificProduct(prodId:string) : Observable<any>{
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${prodId}`)
  }
}
