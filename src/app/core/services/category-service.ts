import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/env';
import { ICategoriesRes, ICategory } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiURL = environment.apiURL + 'category';

  constructor(private _http: HttpClient) {}

  getAllCategories() {
    return this._http.get<ICategoriesRes>(this.apiURL);
  }

  createCategory(categoryData: ICategory) {
    return this._http.post<{ message: string; data: ICategory }>(this.apiURL, categoryData);
  }

  deleteCategory(id: string) {
    return this._http.delete<{ message: string }>(this.apiURL + `/${id}`);
  }
}
