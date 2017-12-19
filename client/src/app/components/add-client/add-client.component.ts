import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client/client.service';
import {Client} from '../../models/client/client';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  // clients: Client[];
  client: Client;
  first_name: string;
  last_name: string;
  phone: string;


  constructor(
    private clientService: ClientService,
    private router: Router,
    private _location: Location
  ) { }

  ngOnInit() {
  }

  goBack(){
    this._location.back();
  }

  addClient(){
    const newClient ={
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    }
    this.clientService.addClient(newClient)
      .subscribe(client =>{
        return;
      });
    this.router.navigate(['/client']);
  }

}
