import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ProductService } from '../core/services/product-service';
import { CategoryService } from '../core/services/category-service';
import { UserService } from '../core/services/user-service';
import { OrderService } from '../core/services/order-service';
import { MessageService } from '../core/services/message-service';
import { IProduct } from '../core/models/product.model';
import { ICategory } from '../core/models/category.model';
import { IUser } from '../core/models/user.model';
import { IPurchase } from '../core/models/purchase.model';
import { IMessage } from '../core/models/message.model';
import { environment } from '../../environments/env';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  activeTab: string = 'overview';
  fileURL = environment.fileURL;

  stats: any = { totalProducts: 0, totalOrders: 0, totalRevenue: 0, totalUsers: 0, blockedUsers: 0, totalRefunds: 0 };
  products: IProduct[] = [];
  categories: ICategory[] = [];
  users: IUser[] = [];
  orders: IPurchase[] = [];
  messages: IMessage[] = [];

  // Product Form
  productForm: FormGroup;
  selectedFile: File | null = null;
  editModeProduct: boolean = false;
  editingProductId: string | null = null;

  // Category Form
  categoryForm: FormGroup;

  // Add Admin Form
  adminForm: FormGroup;

  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _orderService: OrderService,
    private _messageService: MessageService,
    private _fb: FormBuilder
  ) {
    this.productForm = this._fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      stock: [10, Validators.required],
      category: ['أدوات مطبخ', Validators.required],
      slug: ['']
    });

    this.categoryForm = this._fb.group({
      name: ['', Validators.required],
      desc: ['']
    });

    this.adminForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.loadAllData();
  }

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  loadAllData(): void {
    this._orderService.getDashboardStats().subscribe({
      next: (res) => this.stats = res.data,
      error: (err) => console.log(err)
    });

    this._productService.getAllProducts().subscribe({
      next: (res) => this.products = res.data,
      error: (err) => console.log(err)
    });

    this._categoryService.getAllCategories().subscribe({
      next: (res) => this.categories = res.data,
      error: (err) => console.log(err)
    });

    this._userService.getAllUsers().subscribe({
      next: (res) => this.users = res.data,
      error: (err) => console.log(err)
    });

    this._orderService.getAllOrders().subscribe({
      next: (res) => this.orders = res.data,
      error: (err) => console.log(err)
    });

    this._messageService.getAllMessages().subscribe({
      next: (res) => this.messages = res.data,
      error: (err) => console.log(err)
    });
  }

  // --- PRODUCT HANDLERS ---
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  saveProduct(): void {
    if (this.productForm.invalid) return;

    const formData = new FormData();
    Object.keys(this.productForm.value).forEach(key => {
      formData.append(key, this.productForm.value[key]);
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.editModeProduct && this.editingProductId) {
      this._productService.updateProduct(this.editingProductId, formData).subscribe({
        next: () => {
          this.resetProductForm();
          this.loadAllData();
        },
        error: (err) => console.log(err)
      });
    } else {
      this._productService.createProduct(formData).subscribe({
        next: () => {
          this.resetProductForm();
          this.loadAllData();
        },
        error: (err) => console.log(err)
      });
    }
  }

  editProduct(prod: IProduct): void {
    this.editModeProduct = true;
    this.editingProductId = prod._id;
    this.productForm.patchValue({
      name: prod.name,
      desc: prod.desc,
      price: prod.price,
      stock: prod.stock,
      category: prod.category,
      slug: prod.slug
    });
  }

  deleteProduct(id: string): void {
    if (confirm('هل أنت تأكد من حذف هذا المنتج؟')) {
      this._productService.deleteProduct(id).subscribe({
        next: () => this.loadAllData(),
        error: (err) => console.log(err)
      });
    }
  }

  resetProductForm(): void {
    this.productForm.reset({ category: 'أدوات مطبخ', stock: 10, price: 0 });
    this.selectedFile = null;
    this.editModeProduct = false;
    this.editingProductId = null;
  }

  // --- CATEGORY HANDLERS ---
  saveCategory(): void {
    if (this.categoryForm.invalid) return;
    this._categoryService.createCategory(this.categoryForm.value).subscribe({
      next: () => {
        this.categoryForm.reset();
        this.loadAllData();
      },
      error: (err) => console.log(err)
    });
  }

  deleteCategory(id: string): void {
    if (confirm('حذف هذا القسم؟')) {
      this._categoryService.deleteCategory(id).subscribe({
        next: () => this.loadAllData(),
        error: (err) => console.log(err)
      });
    }
  }

  // --- USER MANAGEMENT (ADD ADMIN & BLOCK USER) ---
  saveAdmin(): void {
    if (this.adminForm.invalid) return;
    this._userService.addAdmin(this.adminForm.value).subscribe({
      next: () => {
        this.adminForm.reset();
        alert('تم إضافة الأدمن الجديد بنجاح!');
        this.loadAllData();
      },
      error: (err) => alert(err.error?.message || 'خطأ أثناء إضافة الأدمن')
    });
  }

  toggleBlock(userId: string): void {
    this._userService.toggleBlockUser(userId).subscribe({
      next: () => this.loadAllData(),
      error: (err) => alert(err.error?.message || 'لا يمكن حظر هذا الحساب')
    });
  }

  deleteUser(userId: string): void {
    if (confirm('حذف هذا المستخدم نهائياً؟')) {
      this._userService.deleteUser(userId).subscribe({
        next: () => this.loadAllData(),
        error: (err) => console.log(err)
      });
    }
  }

  // --- ORDER STATUS UPDATES ---
  changeOrderStatus(orderId: string, status: string): void {
    this._orderService.updateOrderStatus(orderId, status).subscribe({
      next: () => this.loadAllData(),
      error: (err) => console.log(err)
    });
  }
}
