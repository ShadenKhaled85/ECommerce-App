import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private httpClient : HttpClient) { }

  // cartCountItems : number = 0;
  // cartCountItems : BehaviorSubject<number>= new BehaviorSubject(0);
  cartCountItems : WritableSignal<number> = signal(0);

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

