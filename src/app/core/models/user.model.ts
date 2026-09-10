export interface IUser {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isBlocked?: boolean;
  createdAt?: string;
}

export interface IAuthRes {
  message: string;
  data: {
    token: string;
    user: IUser;
  };
}

export interface IUsersRes {
  message: string;
  data: IUser[];
}
