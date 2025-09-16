import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {

  constructor( private  httpClient : HttpClient) { }

  myToken = localStorage.getItem('myToken');

  checkoutSession(cartId:string, shippingData: object): Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,
      {
        "shippingAddress": shippingData
      }
    )
  }
}
