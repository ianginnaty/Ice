import { Component, EventEmitter, Output } from '@angular/core';
import { Item } from '../../../models/item/item';
import { ItemService } from '../../../services/item/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  providers: [
    Item,
    ItemService
  ]
})
export class ItemListComponent {

  items : Item[] = [];

  constructor(
    private itemService : ItemService
  ) {
    this.refresh();
  }

  refresh() : void {
    var that = this;

    this.itemService
      .getItems()
      .subscribe(function (response) {
        if (response.success) {
          that.items = response.items;
        }
        else {
          console.error(response);
        }
      });
  }

  @Output() select = new EventEmitter<Item>();

  doSelect(item : Item) : void {
    this.select.emit(item);
  }

}
