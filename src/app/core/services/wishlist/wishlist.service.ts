import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private httpClient : HttpClient ) { }

  getUserWishlist():Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
  }

  addProductToWishlist(productId:string):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
        "productId": productId
      }
    )
  }

  removeProductFromWishlist(productId:string):Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${productId}`)
  }
}
