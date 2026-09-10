import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product-service';
import { CartService } from '../../core/services/cart-service';
import { IProduct } from '../../core/models/product.model';
import { environment } from '../../../environments/env';

@Component({
  selector: 'app-productslist',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './productslist.html',
  styleUrl: './productslist.css'
})
export class Productslist implements OnInit {
  myProducts: IProduct[] = [];
  selectedCategory: string = '';
  searchQuery: string = '';
  fileURL = environment.fileURL;

  categories: string[] = ['أطباق خشبية', 'أدوات مطبخ', 'ديكورات وصواني', 'أثاث وديكور'];

  constructor(
    private _productService: ProductService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this._productService.getAllProducts(this.selectedCategory, this.searchQuery).subscribe({
      next: (res) => {
        this.myProducts = (res && res.data) ? res.data : [];
      },
      error: (err) => {
        console.log(err);
        this.myProducts = [];
      }
    });
  }

  filterCategory(cat: string): void {
    this.selectedCategory = cat;
    this.loadProducts();
  }

  onSearch(): void {
    this.loadProducts();
  }

  addToCart(product: IProduct): void {
    this._cartService.addToCart(product);
  }
}
