import { Component } from '@angular/core';
import { HeroesServices } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  constructor( private heroesServices:  HeroesServices ) {};
  public searchInput = new FormControl();
  public heroes: Hero[] = [];

  public searchHero() {
    const value: string = this.searchInput.value || '';

    return this.heroesServices.getSuggestions( value )
      .subscribe( heroes => this.heroes = heroes );
  }
}
