import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasemoduleComponent } from './basemodule.component';

describe('BasemoduleComponent', () => {
  let component: BasemoduleComponent;
  let fixture: ComponentFixture<BasemoduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasemoduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasemoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
