import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/users.interfaces';
import { AuthServices } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  constructor(

    private authService: AuthServices,
    private router: Router,
  ) {};

  get currentUser():User | undefined {
    return this.authService.currentUser;
  }

  public sideBarItems = [
    { label: 'Listado', icon: 'label', url:'./list' },
    { label: 'Añadir', icon: 'add', url:'./new-hero' },
    { label: 'Buscar', icon: 'search', url:'./search'  }
  ];


  onLogout() :void {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  };

};
