export interface ICategory {
  _id?: string;
  name: string;
  slug?: string;
  desc?: string;
}

export interface ICategoriesRes {
  message: string;
  data: ICategory[];
}
