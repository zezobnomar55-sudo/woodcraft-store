import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/env';
import { IProductRes, IProductsRes } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private _http: HttpClient) {}
  private apiURL = environment.apiURL + 'product';

  getAllProducts(category?: string, search?: string) {
    let params = new HttpParams();
    if (category) params = params.set('category', category);
    if (search) params = params.set('search', search);
    return this._http.get<IProductsRes>(this.apiURL, { params });
  }

  getProductBySlug(slug: string) {
    return this._http.get<IProductRes>(this.apiURL + `/${slug}`);
  }

  createProduct(formData: FormData) {
    return this._http.post<IProductRes>(this.apiURL, formData);
  }

  updateProduct(id: string, formData: FormData) {
    return this._http.put<IProductRes>(this.apiURL + `/${id}`, formData);
  }

  deleteProduct(id: string) {
    return this._http.delete<{ message: string }>(this.apiURL + `/${id}`);
  }
}
