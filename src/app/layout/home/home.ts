import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product-service';
import { MessageService } from '../../core/services/message-service';
import { CartService } from '../../core/services/cart-service';
import { IProduct } from '../../core/models/product.model';
import { IMessage } from '../../core/models/message.model';
import { environment } from '../../../environments/env';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  featuredProducts: IProduct[] = [];
  testimonials: IMessage[] = [];
  fileURL = environment.fileURL;

  constructor(
    private _productService: ProductService,
    private _messageService: MessageService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this._productService.getAllProducts().subscribe({
      next: (res) => {
        this.featuredProducts = (res && res.data) ? res.data.slice(0, 6) : [];
      },
      error: (err) => console.log(err)
    });

    this._messageService.getTestimonials().subscribe({
      next: (res) => {
        this.testimonials = (res && res.data) ? res.data : [];
      },
      error: (err) => console.log(err)
    });
  }

  addToCart(product: IProduct): void {
    this._cartService.addToCart(product);
  }
}
