import { Component, OnInit } from '@angular/core';
import { GiTest } from '../../models/gitest/gitest';

@Component({
  selector: 'app-gi-test',
  templateUrl: './gi-test.component.html',
  styleUrls: ['./gi-test.component.scss']
})
export class GiTestComponent implements OnInit {

  maxLength = 2400;
  tagLength = 48;

  model = new GiTest;

  ngOnInit() {
  }

}
