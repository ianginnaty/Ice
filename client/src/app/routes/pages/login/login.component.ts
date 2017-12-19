import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {AuthService} from '../../../services/auth/auth.service';
import {User} from '../../../models/user/user';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ValidationService} from '../../../services/validation/validation.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    user_name:string;
    password:string;
    valForm: FormGroup;

    constructor(
      public settings: SettingsService,
      private authService: AuthService,
      private router: Router,
      private flashMessage: FlashMessagesService,
      private validationService: ValidationService,
      fb: FormBuilder
    ) {

        this.valForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'password': [null, Validators.required]
        });

    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            console.log('Valid!');
            console.log(value);
        }
        this.onLogin(value.email, value.password);
    }

    onLogin(usename, password){
      const user = {
        user_name:usename,
        password:password
      }
      //Required Fields
      if(!this.validationService.validateUser(user)){
        this.flashMessage.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 5000 });
        return false;
      }

      this.authService.authenticateUser(user)
        .subscribe(user=>{
          if(user.success){
            this.authService.storeUserData(user.token, user.user);
            this.flashMessage.show('Welcome to the Demo', { cssClass: 'alert-success', timeout: 5000 });
            this.router.navigate(['/client']);
          }
          else{
            this.flashMessage.show('Incorrect User Name or Password', { cssClass: 'alert-danger', timeout: 5000 });
          }

        });
    }

    ngOnInit() {

    }

}
