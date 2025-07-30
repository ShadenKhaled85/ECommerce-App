import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private httpClient: HttpClient, private router: Router ) { }

  userData: any;

  signUp(data:object) : Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data)
  }

  signIn(data:object) : Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin` , data)
  }

  // Token Decode
  getUserData(): void{
    // console.log(jwtDecode(localStorage.getItem('myToken')!));
    this.userData = jwtDecode(localStorage.getItem('myToken')!)
    console.log(this.userData);
  }

  signOut() {
    // 1) Remove item from localStorage
    localStorage.removeItem('myToken')

    // 2) Empty property
    this.userData = null

    // 3) Navigate to login
    this.router.navigate(['/login'])
  }
}
