import { Routes } from '@angular/router';
import { ProductsComponent } from './Pages/products/products.component';
import { ProductDetailsComponent } from './Pages/product-details/product-details.component';
import { LoginComponent } from './Pages/login/login.component';
import { authGuard } from './Core/Guards/auth.guard';
import { CartComponent } from './Pages/cart/cart.component';

export const routes: Routes= [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    {
        path: 'login',
        component:LoginComponent
      },
    { path: 'products', component: ProductsComponent,canActivate: [authGuard] },
    { path: 'products/:id', component: ProductDetailsComponent,canActivate: [authGuard] },
    { path: 'cart', component: CartComponent,canActivate: [authGuard] },
  ];

