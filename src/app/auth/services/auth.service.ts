import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environments } from '../../../environments/environments';
import { User } from '../interfaces/users.interfaces';
import { Observable, catchError, map, of, tap } from 'rxjs';;

@Injectable({providedIn: 'root'})
export class AuthServices {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { };

  get currentUser(): User | undefined {
    if ( !this.user ) return undefined;
    return structuredClone( this.user ); //clone deep de el mismo
  }

  login( email: string, password: string): Observable<User> {
    //http.post('login', {email, password})
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap( user => this.user = user),
        tap(user => localStorage.setItem('token', '23jcjncdnj.njji23.njdcjknds'))
      )
  };

  //validar token de user
  checkAuthentication(): Observable<boolean> {
    if( !localStorage.getItem('token') ) return of(false);
    const token = localStorage.getItem('token');
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(err => of(false))
      );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  };
}
