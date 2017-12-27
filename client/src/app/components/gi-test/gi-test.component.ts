import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gi-test',
  templateUrl: './gi-test.component.html',
  styleUrls: ['./gi-test.component.scss']
})
export class GiTestComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }
  
  backOne() {
	this._location.back();
  }

}
