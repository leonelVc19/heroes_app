import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesServices {

  //import variable de entorno
  private baseUrl: string  = environments.baseUrl;
  constructor(private http: HttpClient) { }
//! CRUD
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


  addHero( hero: Hero ): Observable<Hero> {
    return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero)
  }

  updateHero( hero: Hero ): Observable<Hero> {
    if (!hero.id) throw Error ("ID is required");
    return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${ hero.id }`, hero)
  }

  deleteHeroBy( id: string ): Observable<boolean> {
    return this.http.delete(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),

      );
  }
}
