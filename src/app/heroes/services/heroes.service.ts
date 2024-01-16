import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesServices {

  //import variable de entorno
  private baseUrl: string  = environments.baseUrl;
  constructor(private http: HttpClient) { }

  public getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  };


  //herobyID
  getHeroById( id: string ): Observable<Hero|undefined> {
      return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
        .pipe(
          catchError( err => of(undefined) )
        );
  };

  getSuggestions( query: string ): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`);
  }

}
