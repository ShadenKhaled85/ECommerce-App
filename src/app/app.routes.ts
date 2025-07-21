import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthComponent } from './layouts/auth/auth.component';
// import { HomeComponent } from './pages/home/home.component';
// import { CartComponent } from './pages/cart/cart.component';
// import { ProductsComponent } from './pages/products/products.component';
// import { CategoriesComponent } from './pages/categories/categories.component';
// import { BrandsComponent } from './pages/brands/brands.component';
// import { LoginComponent } from './pages/login/login.component';
// import { RegisterComponent } from './pages/register/register.component';
// import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {path:'' , redirectTo: 'home', pathMatch: 'full'},

  {path:'', component: BlankComponent, title: 'Blank', children: [ // We removed 'blank' from path
    {path: 'home', loadComponent: ()=> import('./pages/home/home.component').then( (comp => comp.HomeComponent)) , title: 'Home'},
      {path: 'cart', loadComponent: ()=> import('./pages/cart/cart.component').then( (comp => comp.CartComponent)) , title: 'Cart'},
      {path: 'products', loadComponent: ()=> import('./pages/products/products.component').then( (comp => comp.ProductsComponent)) , title: 'Products'},
      {path: 'categories', loadComponent: ()=> import('./pages/categories/categories.component').then( (comp => comp.CategoriesComponent)) , title: 'Categories'},
      {path: 'brands', loadComponent: ()=> import('./pages/brands/brands.component').then( (comp => comp.BrandsComponent)) , title: 'Brands'}

    // {path: 'cart', component: CartComponent, title: 'Cart'},
    // {path: 'products', component: ProductsComponent, title: 'Products'},
    // {path: 'categories', component: CategoriesComponent, title: 'Categories'},
    // {path: 'brands', component: BrandsComponent, title: 'Brands'}
  ]},

  {path:'', component: AuthComponent, title: 'Auth', children: [
    {path: 'login', loadComponent: ()=> import('./pages/login/login.component').then( (comp) => comp.LoginComponent ), title: 'Login'},
    {path: 'register', loadComponent: ()=> import('./pages/register/register.component').then( (comp) => comp.RegisterComponent ), title: 'Register'},
    {path: '**', loadComponent: ()=> import('./pages/not-found/not-found.component').then( (comp) => comp.NotFoundComponent), title: 'Not Found !!!'}

    // {path: 'login', component: LoginComponent, title: 'Login'},
    // {path: 'register', component: RegisterComponent, title: 'Register'},
    // {path: '**', component: NotFoundComponent, title: 'Not Found !!!'}
  ]},
];
