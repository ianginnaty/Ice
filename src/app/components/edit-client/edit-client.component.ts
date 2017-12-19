import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client/client.service';
import {Client} from '../../models/client/client';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})

export class EditClientComponent implements OnInit {
  clientId: string;
  first_name: string;
  last_name: string;
  phone: string;

  constructor(
    private clientService: ClientService,
    private authService: AuthService,
    private router: ActivatedRoute,
    private route: Router,
    private _location: Location
  ) { }

  ngOnInit() {
    this.router.queryParams.subscribe(params =>{
      this.clientId = params['clientId'];
      this.first_name = params['first_name'];
      this.last_name = params['last_name'];
      this.phone = params['phone'];
    });
  }

  goBack(){
    this._location.back();
  }

  updateClient(params){
    const updateClient: Client ={
      _id: this.clientId,
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    }
    this.clientService.updateClient(updateClient)
    .subscribe(result =>{
      this.clientService.getClient();
    });
      this.route.navigate(['/client']);
  }

  deleteClient(){
    var client = this.clientId;
    this.clientService.deleteClient(client)
      .subscribe(data =>{
        return;
      });
      this.route.navigate(['/client']);
  }
}
