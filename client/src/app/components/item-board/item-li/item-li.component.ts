import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../../models/item/item';

@Component({
  selector: 'app-item-li',
  templateUrl: './item-li.component.html',
  styleUrls: ['./item-li.component.scss'],
  providers: [
    Item
  ]
})
export class ItemLiComponent implements OnInit {

  constructor(
    private _item : Item
  ) { }

  @Input()
  set item(item: Item) {
    this._item = item;
  }

  ngOnInit() {
  }

  get lowStock() : boolean {
    return 0 < this._item.quantity && 5 > this._item.quantity;
  }

}
