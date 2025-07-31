import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ICartItem } from '../../../shared/interfaces/i-cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private httpClient : HttpClient) { }

  myToken = localStorage.getItem('myToken')!;

  addProductToCart( productId:string ) : Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`,
      { // Body
      "productId": productId
      },
      { // Headers
        headers: {
          token : this.myToken
        }
      }
    )
  }
}
