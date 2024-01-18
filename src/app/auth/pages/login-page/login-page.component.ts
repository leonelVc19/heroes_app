import { Component } from '@angular/core';
import { AuthServices } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(
    private authServices: AuthServices,
    private router: Router,
  ) {}
  public onLogin(): void {
    this.authServices.login('leonel@algo.com', '123456')
      .subscribe( user => {
        this.router.navigate(['/'])
      } )
  }
}
