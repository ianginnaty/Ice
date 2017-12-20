import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';

import {User} from '../../../models/user/user';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    user: any;
    constructor(
      public userblockService: UserblockService,
      private authService: AuthService,
      private router: Router
    ) {

        this.user = {
            picture: 'assets/img/user/01.jpg'
        };
    }

    ngOnInit() {
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }


    onLogoutClick(){
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }

}
