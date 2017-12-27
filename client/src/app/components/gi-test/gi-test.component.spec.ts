import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiTestComponent } from './gi-test.component';

describe('GiTestComponent', () => {
  let component: GiTestComponent;
  let fixture: ComponentFixture<GiTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
