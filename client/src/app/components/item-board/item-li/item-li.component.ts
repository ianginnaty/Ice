import { Component, OnInit } from '@angular/core';
import { Item } from '../../../models/item/item';

@Component({
  selector: 'app-item-li',
  templateUrl: './item-li.component.html',
  styleUrls: ['./item-li.component.scss']
})
export class ItemLiComponent implements OnInit {

  constructor(
    private item: Item
  ) { }

  ngOnInit() {
  }

}
