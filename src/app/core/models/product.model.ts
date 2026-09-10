export interface IProduct {
  _id: string;
  name: string;
  desc: string;
  price: number;
  imgURL: string;
  stock: number;
  category: string;
  slug: string;
  createdAt?: string;
}

export interface IProductsRes {
  message: string;
  data: IProduct[];
}

export interface IProductRes {
  message: string;
  data: IProduct;
}
