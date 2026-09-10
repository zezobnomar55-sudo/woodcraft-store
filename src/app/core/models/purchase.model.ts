import { IProduct } from './product.model';
import { IUser } from './user.model';

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface IPurchase {
  _id?: string;
  user?: IUser | string;
  items: {
    product: IProduct | string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  address: string;
  status?: string;
  createdAt?: string;
}

export interface IPurchasesRes {
  message: string;
  data: IPurchase[];
}
