import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/env';
import { IAuthRes, IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = environment.apiURL + 'auth';
  private currentUserSubject = new BehaviorSubject<IUser | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private _http: HttpClient) {}

  register(userData: any) {
    return this._http.post<IAuthRes>(this.apiURL + '/register', userData).pipe(
      tap((res) => this.setSession(res))
    );
  }

  login(credentials: any) {
    return this._http.post<IAuthRes>(this.apiURL + '/login', credentials).pipe(
      tap((res) => this.setSession(res))
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === 'admin';
  }

  private setSession(authResult: IAuthRes) {
    localStorage.setItem('token', authResult.data.token);
    localStorage.setItem('user', JSON.stringify(authResult.data.user));
    this.currentUserSubject.next(authResult.data.user);
  }

  private getStoredUser(): IUser | null {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }
}
