import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // Reemplaza con la URL de tu backend
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject(null);
  public isAuthenticated$: Observable<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.tokenSubject.next(localStorage.getItem('token'));
    this.isAuthenticated$ = this.tokenSubject.asObservable().pipe(
      tap(token => {
        if (!token) {
          // Si no hay token, el usuario no está autenticado
        }
      }),
      // Mapea el token a un booleano (true si hay token, false si no)
      obsToken => obsToken.map(token => !!token)
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.tokenSubject.next(response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.tokenSubject.getValue();
  }
}