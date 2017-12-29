import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Item } from '../../models/item/item';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService {

  constructor(private http: Http) { }

  // retrieving ClientService
  getItems(){
    return this.http.get('http://localhost:3000/api/item/all')
    .map(res => res.json());
  }

  //add Client
  addItem(newItem){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/item/add', newItem, { headers: headers })
      .map(res => res.json());
  }

}
