import { Routes } from '@angular/router';
import { Home } from './layout/home/home';
import { Productslist } from './layout/productslist/productslist';
import { Productdetail } from './layout/productdetail/productdetail';
import { Cart } from './layout/cart/cart';
import { Login } from './layout/login/login';
import { Register } from './layout/register/register';
import { Myorders } from './layout/myorders/myorders';
import { Contact } from './layout/contact/contact';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: Productslist },
  { path: 'product/:slug', component: Productdetail },
  { path: 'cart', component: Cart },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'my-orders', component: Myorders, canActivate: [authGuard] },
  { path: 'contact', component: Contact },
  { path: 'dashboard', component: Dashboard, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' }
];
