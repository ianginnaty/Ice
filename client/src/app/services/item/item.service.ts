import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Item } from '../../models/item/item';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService {

  constructor(private http: Http) { }

  // retrieving Items
  getItems() {
    return this.http.get('http://localhost:3000/api/item/all')
    .map(res => res.json());
  }

  // add Item
  addItem(newItem : Item) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/item/add', newItem, { headers: headers })
      .map(res => res.json());
  }

  // update Item
  updateItem(item : Item) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/item/update', item, { headers: headers })
      .map(res => res.json());
  }

  // delete Item
  dropItem(item : Item) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/item/delete', { _id: item._id }, { headers: headers })
      .map(res => res.json());
  }

}
