import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/env';
import { IPurchasesRes, IPurchase } from '../models/purchase.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiURL = environment.apiURL;

  constructor(private _http: HttpClient) {}

  createOrder(orderData: any) {
    return this._http.post<{ message: string; data: any }>(this.apiURL + 'purchase', orderData);
  }

  getMyOrders() {
    return this._http.get<IPurchasesRes>(this.apiURL + 'purchase/my');
  }

  getAllOrders() {
    return this._http.get<IPurchasesRes>(this.apiURL + 'purchase/all');
  }

  updateOrderStatus(orderId: string, status: string) {
    return this._http.patch<{ message: string; data: IPurchase }>(this.apiURL + `purchase/${orderId}/status`, { status });
  }

  requestRefund(orderId: string) {
    return this._http.patch<{ message: string; data: IPurchase }>(this.apiURL + `purchase/${orderId}/refund`, {});
  }

  getDashboardStats() {
    return this._http.get<{ message: string; data: any }>(this.apiURL + 'report/stats');
  }
}
