import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {AuthService} from '../../../services/auth/auth.service';
import {User} from '../../../models/user/user';
import {Router} from '@angular/router';
// import {ValidationService} from '../../../services/validation/validation.service';

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
      // private validationService: ValidationService,
      fb: FormBuilder
    ) {

        this.valForm = fb.group({
            'user_name': [null, Validators.compose([Validators.required, CustomValidators.user_name])],
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
        this.onLogin();
    }

    onLogin(){
      const user = {
        user_name:this.user_name,
        password:this.password
      }
      //Required Fields
      // if(!this.validationService.validateUser(user)){
      //   this.flashMessage.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 5000 });
      //   return false;
      // }

      this.authService.authenticateUser(user)
        .subscribe(user=>{
          if(user.success){
            this.authService.storeUserData(user.token, user.user);
            // this.flashMessage.show('Welcome to the Demo', { cssClass: 'alert-success', timeout: 5000 });
            alert('You logged in!');
            this.router.navigate(['/client']);
          }
          else{
            alert('Something went wrong');
          }

        });
    }

    ngOnInit() {

    }

}
