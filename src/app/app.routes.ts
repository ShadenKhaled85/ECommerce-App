import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedGuard } from './core/guards/logged/logged.guard';

export const routes: Routes = [
  {path:'' , redirectTo: 'home', pathMatch: 'full'},

  {path:'', component: BlankComponent, canActivate: [authGuard], title: 'Blank', children: [ // We removed 'blank' from path
    {path: 'home', loadComponent: ()=> import('./pages/home/home.component').then( (comp => comp.HomeComponent)) , title: 'Home'},
      {path: 'cart', loadComponent: ()=> import('./pages/cart/cart.component').then( (comp => comp.CartComponent)) , title: 'Cart'},
      {path: 'products', loadComponent: ()=> import('./pages/products/products.component').then( (comp => comp.ProductsComponent)) , title: 'Products'},
      {path: 'categories', loadComponent: ()=> import('./pages/categories/categories.component').then( (comp => comp.CategoriesComponent)) , title: 'Categories'},
      {path: 'brands', loadComponent: ()=> import('./pages/brands/brands.component').then( (comp => comp.BrandsComponent)) , title: 'Brands'},
      {path: 'details/:id', loadComponent: ()=> import('./pages/details/details.component').then( (comp => comp.DetailsComponent)) , title: 'Product Details', data: { renderMode: 'client' }}
  ]},

  {path:'', component: AuthComponent, canActivate: [loggedGuard], title: 'Auth', children: [
    {path: 'login', loadComponent: ()=> import('./pages/login/login.component').then( (comp) => comp.LoginComponent ), title: 'Login'},
    {path: 'register', loadComponent: ()=> import('./pages/register/register.component').then( (comp) => comp.RegisterComponent ), title: 'Register'},
    {path: 'forgotPass', loadComponent: ()=> import('./shared/components/ui/forgot-password/forgot-password.component').then( (comp) => comp.ForgotPasswordComponent ), title: 'Forgot Password'},
    {path: '**', loadComponent: ()=> import('./pages/not-found/not-found.component').then( (comp) => comp.NotFoundComponent), title: 'Not Found !!!'}
  ]},
];
