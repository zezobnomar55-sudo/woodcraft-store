import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product-service';
import { CartService } from '../../core/services/cart-service';
import { IProduct } from '../../core/models/product.model';
import { environment } from '../../../environments/env';

@Component({
  selector: 'app-productdetail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productdetail.html',
  styleUrl: './productdetail.css'
})
export class Productdetail implements OnInit {
  product: IProduct | null = null;
  fileURL = environment.fileURL;
  quantity: number = 1;

  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    const slug = this._route.snapshot.paramMap.get('slug');
    if (slug) {
      this._productService.getProductBySlug(slug).subscribe({
        next: (res) => {
          this.product = res.data;
        },
        error: (err) => console.log(err)
      });
    }
  }

  addToCart(): void {
    if (this.product) {
      this._cartService.addToCart(this.product, this.quantity);
    }
  }

  inc(): void { this.quantity++; }
  dec(): void { if (this.quantity > 1) this.quantity--; }
}
