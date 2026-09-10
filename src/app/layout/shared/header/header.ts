import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth-service';
import { CartService } from '../../../core/services/cart-service';
import { IUser } from '../../../core/models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  currentUser: IUser | null = null;
  cartCount: number = 0;

  constructor(
    private _authService: AuthService,
    private _cartService: CartService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this._cartService.cartItems$.subscribe(() => {
      this.cartCount = this._cartService.getItemCount();
    });
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
