import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/env';
import { IUser, IUsersRes } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = environment.apiURL + 'user';

  constructor(private _http: HttpClient) {}

  getAllUsers() {
    return this._http.get<IUsersRes>(this.apiURL);
  }

  addAdmin(adminData: any) {
    return this._http.post<{ message: string; data: IUser }>(this.apiURL + '/add-admin', adminData);
  }

  toggleBlockUser(userId: string) {
    return this._http.patch<{ message: string; data: IUser }>(this.apiURL + `/${userId}/toggle-block`, {});
  }

  deleteUser(userId: string) {
    return this._http.delete<{ message: string }>(this.apiURL + `/${userId}`);
  }
}
