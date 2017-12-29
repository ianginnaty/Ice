import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLiComponent } from './item-li.component';

describe('ItemLiComponent', () => {
  let component: ItemLiComponent;
  let fixture: ComponentFixture<ItemLiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemLiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemLiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
