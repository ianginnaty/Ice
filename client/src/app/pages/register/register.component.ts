import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import {RegisterService} from '../../services/register/register.service';
import {User} from '../../models/user/user';
import {Router} from '@angular/router';
// import {ValidationService} from '../../services/validation/validation.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    user: User;
    first_name: string;
    last_name: string;
    email: string;
    user_name: string;
    password: string;

    valForm: FormGroup;
    passwordForm: FormGroup;

    constructor(
      public settings: SettingsService,
      private router: Router,
      private registerService: RegisterService,
      fb: FormBuilder
    ) {

        let password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]));
        let certainPassword = new FormControl('', CustomValidators.equalTo(password));

        this.passwordForm = fb.group({
            'password': password,
            'confirmPassword': certainPassword
        });

        this.valForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'accountagreed': [null, Validators.required],
            'passwordGroup': this.passwordForm
        });
    }

    addUser(){
      const newUser ={
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        user_name: this.user_name,
        password: this.password
    }

          //Required Fields
      // if(!this.validationService.validateRegister(newUser)){
      //   this.flashMessage.show('Please fill in all the fields', { cssClass: 'alert-danger', timeout: 5000 });
      //   return false;
      // }

      // Required Email
      // if(!this.validationService.validateEmail(this.email)){
      //   this.flashMessage.show('Please a valid email', { cssClass: 'alert-danger', timeout: 5000 });
      //   return false;
      // }

      this.registerService.addUser(newUser)
        .subscribe(user =>{
          if(user.success){
            alert('You Registerd!');
            // this.flashMessage.show('You have been Registerd', { cssClass: 'alert-success', timeout: 5000 });
            this.router.navigate(['/login']);
          }
          else{
            alert('Something went wrong');
            // this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 5000 });
            this.router.navigate(['/register']);
          }
        });


      }


    // submitForm($ev, value: any) {
    //     $ev.preventDefault();
    //     for (let c in this.valForm.controls) {
    //         this.valForm.controls[c].markAsTouched();
    //     }
    //     for (let c in this.passwordForm.controls) {
    //         this.passwordForm.controls[c].markAsTouched();
    //     }
    //
    //     if (this.valForm.valid) {
    //         console.log('Valid!');
    //         console.log(value);
    //     }
    // }

    ngOnInit() {
    }

}
