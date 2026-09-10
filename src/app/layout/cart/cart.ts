import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart-service';
import { OrderService } from '../../core/services/order-service';
import { AuthService } from '../../core/services/auth-service';
import { ICartItem } from '../../core/models/purchase.model';
import { environment } from '../../../environments/env';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cartItems: ICartItem[] = [];
  address: string = 'القاهرة، مصر';
  fileURL = environment.fileURL;
  orderSuccess: boolean = false;

  constructor(
    private _cartService: CartService,
    private _orderService: OrderService,
    public authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  updateQty(productId: string, qty: number): void {
    this._cartService.updateQuantity(productId, qty);
  }

  removeItem(productId: string): void {
    this._cartService.removeFromCart(productId);
  }

  getTotal(): number {
    return this._cartService.getTotalAmount();
  }

  checkout(): void {
    if (!this.authService.isLoggedIn()) {
      this._router.navigate(['/login']);
      return;
    }

    const payload = {
      items: this.cartItems.map(i => ({
        product: i.product._id,
        quantity: i.quantity,
        price: i.product.price
      })),
      totalAmount: this.getTotal(),
      address: this.address
    };

    this._orderService.createOrder(payload).subscribe({
      next: (res) => {
        this.orderSuccess = true;
        this._cartService.clearCart();
      },
      error: (err) => console.log(err)
    });
  }
}
