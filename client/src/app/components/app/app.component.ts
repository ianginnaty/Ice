import { Component } from '@angular/core';
import {User} from '../../models/user/user';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector:'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})

export class AppComponent{
  title = 'Blaze';

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }


  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You have logged out!', { cssClass: 'alert-success', timeout: 5000});
    this.router.navigate(['/login']);
    return false;
  }

}
