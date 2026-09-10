import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-wood text-light py-4 mt-5 border-top border-warning">
      <div class="container text-center">
        <p class="mb-1 fw-bold fs-5">WoodCraft &copy; 2026 - جميع الحقوق محفوظة</p>
        <p class="text-warning small mb-0">منتجات خشبية طبيعية 100% صُنعت بأيدي مصرية ماهرة</p>
      </div>
    </footer>
  `
})
export class Footer {}
