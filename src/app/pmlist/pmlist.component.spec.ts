import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmlistComponent } from './pmlist.component';

describe('PmlistComponent', () => {
  let component: PmlistComponent;
  let fixture: ComponentFixture<PmlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
