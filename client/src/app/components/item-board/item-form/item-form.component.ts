import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators }   from '@angular/forms';
import { Item } from '../../../models/item/item';
import { validateConfig } from '@angular/router/src/config';
import { ItemService } from '../../../services/item/item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
  providers: [
    Item,
    ItemService
  ]
})
export class ItemFormComponent implements OnInit {

  mode: string = "add";
  isEditing: boolean = false;

  config = {
    title: {
      pattern: /[A-Z].*/,
      minLength: 4,
      maxLength: 40,
      required: true
    },
    description: {
      maxLength: 80,
      required: true
    },
    price: {
      pattern: /\$?([1-9]\d*|[1-9]\d{1,2}(,\d{3})*|0)(\.\d{2})?/,
      required: true
    },
    quantity: {
      pattern: /([1-9]\d*|0)/
    },
    details: {
      maxLength: 2400
    }
  };

  validators = null;
  itemForm = null;

  constructor(
    private item: Item = new Item,
    private itemService: ItemService
  ) {
    // TODO: extract to utility function
    let config = this.config;
    // params: config
    let set, validator, validators = {};
    for (let field in config) {
      set = config[field];
      validator = [];
      for (let control in set) {
        if ("required" == control) {
          if (set[control]) {
            validator.push(Validators.required);
          }
        }
        else {
          validator.push(Validators[control](set[control]));
        }
      }
      validators[field] = validator;
    }
    // return: validators
    this.validators = validators;

    // TODO: extract to utility function
    let model = this.item;
    validators = this.validators;
    // params: model, validator
    let group = {};
    for (let field in validators) {
      group[field] = new FormControl(model[field], validators[field]);
    }
    // return
    this.itemForm = new FormGroup(group);
  }

  ngOnInit() : void {
  }

  submit() : void {
    var that = this;

    console.log("Submitting...");

    this.itemService
      .addItem(this.item)
      .subscribe(function (response) {
        if (response.success) {
          that.clearForm();
          console.log(response.msg);
        }
        else {
          console.error(response);
        }
      });
  }

  clearForm(): void {
    /*
    for (let key in this.item) {
      this.item[key] = null;
    }
    */
    this.itemForm.reset();
  }

}
