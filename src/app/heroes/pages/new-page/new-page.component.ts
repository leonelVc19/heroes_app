import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { filter, switchMap, takeWhile, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesServices } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';




@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  constructor(
    private heroesService: HeroesServices,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private matDialog:  MatDialog
  ) {};

  ngOnInit(): void {
    //carga de pagina
    if(! this.router.url.includes('edit') ) return;
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById( id ) ),
      ).subscribe( hero => {
        if ( !hero ) return this.router.navigateByUrl('/');

        //* enviando el hero al template
        this.heroForm.reset( hero );
        return;
      })

  };

  get currentHero( ):  Hero{
    const hero =  this.heroForm.value as Hero;
    return hero;
  }

  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', { nonNullable: true }),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', value: 'DC - Comics' },
    { id: 'Marvel Comics', value: 'Marvel - Comics' }
  ];

  onSumit():void {
    if ( this.heroForm.invalid ) return;

    //* Update Hero if have ID
    if ( this.currentHero.id ) {
      this.heroesService.updateHero( this.currentHero )
        .subscribe( hero => {
          // TODO mostrar el snackbar
          this.showSnackBar(`${ hero.superhero } updated`)
        });

      return;
    };

    //* Save Hero

    this.heroesService.addHero( this.currentHero  )
      .subscribe( hero => {
        // TODO mostrar snackbar, y navegar a /herores/edit/hero.id
        this.router.navigate(['/heroes/edit', hero.id])
        this.showSnackBar(`${ hero.superhero } created`)

      });

  };

  onDeleteHero() {
    if( !this.currentHero.id ) throw Error('Hero is required');

    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    //Mejorando el codigo
    dialogRef.afterClosed()
      .pipe(
        filter( ( result: boolean ) =>  result === true ),
        switchMap( () => this.heroesService.deleteHeroBy( this.currentHero.id )),
        filter(( wasDelted: boolean) => wasDelted),
      )
      .subscribe(result => {
        this.router.navigate(['/heroes']);
      })

     //* este codigo es el mismo a donde se estas utilizando los operadores de rjxs
    // dialogRef.afterClosed().subscribe(result => {
    //   if( !result ) return;
    //   this.heroesService.deleteHeroBy( this.currentHero.id )
    //     .subscribe( wasDeleted => {
    //       if( wasDeleted ) {
    //         this.router.navigate(['/heroes']);
    //       }
    //     })
    // });
  }

  showSnackBar( message: string ):void {
    this.snackBar.open( message, 'done', {
      duration: 2500,
    } )
  };

  // TODO Delete
}
