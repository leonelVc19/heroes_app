import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environments } from '../../../environments/environments';
import { User } from '../interfaces/users.interfaces';
import { Observable, tap } from 'rxjs';

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
        tap(user => localStorage.setItem('token', user.id.toString()))
      )
  }
}
