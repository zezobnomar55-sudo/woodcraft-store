import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, MOCK_PRODUCTS } from '../../core/services/product-service';
import { MessageService } from '../../core/services/message-service';
import { CartService } from '../../core/services/cart-service';
import { IProduct } from '../../core/models/product.model';
import { IMessage } from '../../core/models/message.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  featuredProducts: IProduct[] = MOCK_PRODUCTS.slice(0, 6);
  testimonials: IMessage[] = [];

  constructor(
    private _productService: ProductService,
    private _messageService: MessageService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this._productService.getAllProducts().subscribe({
      next: (res) => {
        if (res && res.data && res.data.length > 0) {
          this.featuredProducts = res.data.slice(0, 6);
        }
      }
    });

    this._messageService.getTestimonials().subscribe({
      next: (res) => {
        if (res && res.data && res.data.length > 0) {
          this.testimonials = res.data;
        }
      }
    });
  }

  getImageUrl(url: string): string {
    if (!url) return 'files/plate_1.png';
    if (url.startsWith('http')) return url;
    const cleaned = url.replace(/^\/?(files\/)?/, '');
    return 'files/' + cleaned;
  }

  addToCart(product: IProduct): void {
    this._cartService.addToCart(product);
  }
}
