import { Component, Input } from '@angular/core';
import { Item } from '../../../models/item/item';

@Component({
  selector: 'app-item-li',
  templateUrl: './item-li.component.html',
  styleUrls: ['./item-li.component.scss'],
  providers: [
    Item
  ]
})
export class ItemLiComponent {

  constructor(
    private _item : Item
  ) { }

  @Input()
  set item(item: Item) {
    this._item = item;
  }

  lowStock() {
    return 5 > this._item.quantity;
  }

  getClasses() {
    return {
      "low-stock": this.lowStock()
    };
  }

}
