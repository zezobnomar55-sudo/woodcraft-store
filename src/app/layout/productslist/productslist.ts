import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, MOCK_PRODUCTS } from '../../core/services/product-service';
import { CartService } from '../../core/services/cart-service';
import { IProduct } from '../../core/models/product.model';

@Component({
  selector: 'app-productslist',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './productslist.html',
  styleUrl: './productslist.css'
})
export class Productslist implements OnInit {
  myProducts: IProduct[] = MOCK_PRODUCTS;
  selectedCategory: string = '';
  searchQuery: string = '';

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
        if (res && res.data && res.data.length > 0) {
          this.myProducts = res.data;
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

  filterCategory(cat: string): void {
    this.selectedCategory = cat;
    if (!cat || cat === 'الكل') {
      this.myProducts = MOCK_PRODUCTS;
    } else {
      this.myProducts = MOCK_PRODUCTS.filter(p => p.category === cat);
    }
    this.loadProducts();
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.myProducts = MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    } else {
      this.myProducts = MOCK_PRODUCTS;
    }
    this.loadProducts();
  }

  addToCart(product: IProduct): void {
    this._cartService.addToCart(product);
  }
}
