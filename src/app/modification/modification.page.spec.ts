import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationPage } from './modification.page';

describe('ModificationPage', () => {
  let component: ModificationPage;
  let fixture: ComponentFixture<ModificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
