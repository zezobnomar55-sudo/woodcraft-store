import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../models/product.model';
import { ICartItem } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<ICartItem[]>(this.loadCart());
  public cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: IProduct, quantity: number = 1) {
    const items = [...this.cartItemsSubject.value];
    const existingIndex = items.findIndex(item => item.product._id === product._id);

    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({ product, quantity });
    }

    this.saveCart(items);
  }

  removeFromCart(productId: string) {
    const items = this.cartItemsSubject.value.filter(item => item.product._id !== productId);
    this.saveCart(items);
  }

  updateQuantity(productId: string, quantity: number) {
    const items = [...this.cartItemsSubject.value];
    const item = items.find(i => i.product._id === productId);
    if (item) {
      item.quantity = quantity > 0 ? quantity : 1;
      this.saveCart(items);
    }
  }

  clearCart() {
    this.saveCart([]);
  }

  getCartItems(): ICartItem[] {
    return this.cartItemsSubject.value;
  }

  getTotalAmount(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getItemCount(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.quantity, 0);
  }

  private saveCart(items: ICartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items));
    this.cartItemsSubject.next(items);
  }

  private loadCart(): ICartItem[] {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }
}
