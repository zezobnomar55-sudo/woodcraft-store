import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../core/services/order-service';
import { IPurchase } from '../../core/models/purchase.model';
import { environment } from '../../../environments/env';

@Component({
  selector: 'app-myorders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './myorders.html'
})
export class Myorders implements OnInit {
  myOrders: IPurchase[] = [];
  fileURL = environment.fileURL;

  constructor(private _orderService: OrderService) {}

  ngOnInit(): void {
    this._orderService.getMyOrders().subscribe({
      next: (res) => this.myOrders = res.data,
      error: (err) => console.log(err)
    });
  }

  requestRefund(orderId: string): void {
    if (confirm('هل تريد طلب استرداد المبلغ لهذا الطلب؟')) {
      this._orderService.requestRefund(orderId).subscribe({
        next: () => {
          alert('تم طلب الاسترداد بنجاح!');
          this.ngOnInit();
        },
        error: (err) => console.log(err)
      });
    }
  }
}
