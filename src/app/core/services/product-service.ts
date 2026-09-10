import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/env';
import { IProductsRes, IProductRes, IProduct } from '../models/product.model';
import { of, catchError } from 'rxjs';

export const MOCK_PRODUCTS: IProduct[] = [
  {
    _id: '1',
    name: 'طبق خشب زان محفور يدوياً',
    desc: 'طبق تقديم مصنوع يدوياً من أنقى أنواع خشب الزان الطبيعي، مناسب للمقبلات والحلويات.',
    price: 350,
    imgURL: 'plate_1.png',
    stock: 15,
    category: 'أطباق خشبية',
    slug: 'wooden-beech-plate'
  },
  {
    _id: '2',
    name: 'طقم معالق توزيع خشب جوز',
    desc: 'طقم معالق وشوك توزيع من خشب الجوز الفاخر، مقاوم للحرارة وآمن للطهي.',
    price: 240,
    imgURL: 'spoons_1.png',
    stock: 25,
    category: 'أدوات مطبخ',
    slug: 'walnut-spoons-set'
  },
  {
    _id: '3',
    name: 'سلطانية تقديم خشب زيتون',
    desc: 'سلطانية عميقة مصنوعة من خشب الزيتون التونسي ذو التجزيعات الطبيعية الساحرة.',
    price: 480,
    imgURL: 'bowl_1.png',
    stock: 10,
    category: 'أطباق خشبية',
    slug: 'olive-wood-bowl'
  },
  {
    _id: '4',
    name: 'لوح تقطيع خشبي أرو متين',
    desc: 'لوح تقطيع سميك مقاوم للبكتيريا والخدوش مصنوع من خشب الأرو الصلب.',
    price: 420,
    imgURL: 'cutting_board_1.png',
    stock: 20,
    category: 'أدوات مطبخ',
    slug: 'oak-cutting-board'
  },
  {
    _id: '5',
    name: 'صينية تقديم مستطيلة بيد خشب',
    desc: 'صينية تقديم راقية ضخمة للمشروبات والقهوة بتصميم مودرن عالي الجودة.',
    price: 590,
    imgURL: 'tray_1.png',
    stock: 8,
    category: 'ديكورات وصواني',
    slug: 'wooden-serving-tray'
  },
  {
    _id: '6',
    name: 'ترابيزة قهوة جانبية خشب طبيعي',
    desc: 'طاولة قهوة مودرن مصنوعة من شريحة خشبية طبيعية بأرجل معدنية سوداء.',
    price: 1850,
    imgURL: 'table_1.png',
    stock: 5,
    category: 'أثاث وديكور',
    slug: 'wooden-coffee-table'
  },
  {
    _id: '7',
    name: 'طبق تقديم بيضاوي خشب أرو',
    desc: 'طبق تقديم بيضاوي مميز بلمسة تشطيب فاخرة وعازلة للزيوت والسوائل.',
    price: 390,
    imgURL: 'plate_2.png',
    stock: 12,
    category: 'أطباق خشبية',
    slug: 'oval-oak-serving-plate'
  },
  {
    _id: '8',
    name: 'طقم خفاقات ومغارف خشب طهي',
    desc: 'طقم طهي احترافي 5 قطع مصمم خصيصاً للحلل والأواني الجرانيت والسيراميك.',
    price: 280,
    imgURL: 'spoons_2.png',
    stock: 18,
    category: 'أدوات مطبخ',
    slug: 'spatulas-cooking-set'
  },
  {
    _id: '9',
    name: 'سلطانية فواكه خشب زان فاخرة',
    desc: 'وعاء فواكه كبير بتجزيعات طبيعية يعطي لمسة فخامة لترابيزة السفرة.',
    price: 520,
    imgURL: 'bowl_2.png',
    stock: 7,
    category: 'أطباق خشبية',
    slug: 'luxury-beech-fruit-bowl'
  },
  {
    _id: '10',
    name: 'لوح تقديم وجبات خشب طبيعي',
    desc: 'لوح تقديم ستيك ومشويات مقاس كبير مزود بمجرى لحفظ عصارة الطعام.',
    price: 310,
    imgURL: 'cutting_board_2.png',
    stock: 14,
    category: 'أدوات مطبخ',
    slug: 'steak-serving-board'
  },
  {
    _id: '11',
    name: 'صينية قهوة دائرية بتجمعات خشبية',
    desc: 'صينية دائرية كلاسيكية معالج ضد الرطوبة للمشروبات اليومية.',
    price: 460,
    imgURL: 'tray_2.png',
    stock: 9,
    category: 'ديكورات وصواني',
    slug: 'round-coffee-tray'
  },
  {
    _id: '12',
    name: 'طاولة ديكور خشب أرو بأرجل معدنية',
    desc: 'طاولة جانبية راقية للديكور والزرع بتصميم عصري ملفت للأنظار.',
    price: 2100,
    imgURL: 'table_2.png',
    stock: 4,
    category: 'أثاث وديكور',
    slug: 'oak-accent-table'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiURL = environment.apiURL + 'product';

  constructor(private _http: HttpClient) {}

  getAllProducts(category?: string, search?: string) {
    let params = new HttpParams();
    if (category) params = params.set('category', category);
    if (search) params = params.set('search', search);

    const headers = new HttpHeaders({ 'bypass-tunnel-reminder': 'true' });

    return this._http.get<IProductsRes>(this.apiURL, { params, headers }).pipe(
      catchError(() => {
        let filtered = MOCK_PRODUCTS;
        if (category && category !== 'الكل') {
          filtered = filtered.filter(p => p.category === category);
        }
        if (search) {
          filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        }
        return of({ message: 'products list', data: filtered });
      })
    );
  }

  getProductBySlug(slug: string) {
    return this._http.get<IProductRes>(this.apiURL + `/${slug}`).pipe(
      catchError(() => {
        const found = MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0];
        return of({ message: 'product detail', data: found });
      })
    );
  }

  createProduct(formData: FormData) {
    return this._http.post<{ message: string; data: IProduct }>(this.apiURL, formData);
  }

  updateProduct(id: string, formData: FormData) {
    return this._http.put<{ message: string; data: IProduct }>(this.apiURL + `/${id}`, formData);
  }

  deleteProduct(id: string) {
    return this._http.delete<{ message: string }>(this.apiURL + `/${id}`);
  }
}
