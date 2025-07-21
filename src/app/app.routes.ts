import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {path:'' , redirectTo: 'home', pathMatch: 'full'},

  {path:'', component: BlankComponent, title: 'Blank', children: [ // We removed 'blank' from path
    {path: 'home', component: HomeComponent, title: 'Home'},
    {path: 'cart', component: CartComponent, title: 'Cart'},
    {path: 'products', component: ProductsComponent, title: 'Products'},
    {path: 'categories', component: CategoriesComponent, title: 'Categories'},
    {path: 'brands', component: BrandsComponent, title: 'Brands'},
  ]},

  {path:'', component: AuthComponent, title: 'Auth', children: [
    {path: 'login', component: LoginComponent, title: 'Login'},
    {path: 'register', component: RegisterComponent, title: 'Register'},
    {path: '**', component: NotFoundComponent, title: 'Not Found !!!'}
  ]},

];
