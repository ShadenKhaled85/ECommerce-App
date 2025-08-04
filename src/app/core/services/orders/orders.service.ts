import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { IUser } from '../../../shared/interfaces/iuser';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) {
    this.saveUserData(); // Automatically decode token when service is created
  }

  userData : IUser | null = {} as IUser

  private saveUserData(): void {
      const token = localStorage.getItem('myToken');
      if (token) {
        this.userData = jwtDecode<IUser>(token);
        console.log('Decoded User:', this.userData);
      }
    }

  getUserOrders(): Observable<any>{
    const userId = this.userData?.id;
    if (!userId) {
      throw new Error('User ID not available. Make sure token is valid.');
    }
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${userId}`);
  }
}
