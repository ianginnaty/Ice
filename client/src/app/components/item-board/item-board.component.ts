import { Component, Output } from '@angular/core';
import { Item } from '../../models/item/item';

@Component({
  selector: 'app-item-board',
  templateUrl: './item-board.component.html',
  styleUrls: ['./item-board.component.scss'],
  providers: [
    Item
  ]
})
export class ItemBoardComponent {

  constructor(
    private item : Item
  ) { }

  setItem(item : Item) {
    this.item = item;
  }

  get itemSelected() : boolean {
    return null != this.item._id;
  }

}
