import { Component, OnInit } from '@angular/core';
import { HeroesServices } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {
  //
  public heroes: Hero[] = [];

  //inyeccion del servicio
  constructor( private heroesServices: HeroesServices ) {}

  ngOnInit(): void {
    this.heroesServices.getHeroes().subscribe( heroes => this.heroes = heroes )
  }
}
