import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPage } from './ajout.page';

describe('AjoutPage', () => {
  let component: AjoutPage;
  let fixture: ComponentFixture<AjoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
