import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private httpClient : HttpClient) { }

  addProductToCart( productId:string ) : Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`,
      { // Body
        "productId": productId
      }
    )
  }

  getLoggedUserCart() : Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`)
  }

  removeCartItem(productId:string) : Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${productId}`)
  }

  updateCartProductQuantity(productId: string, quantity: any): Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${productId}`,
      {
        "count": quantity
      }
    )
  }

  clearUserCart(): Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }
}

