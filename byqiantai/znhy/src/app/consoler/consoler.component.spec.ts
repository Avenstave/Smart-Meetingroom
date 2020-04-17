import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolerComponent } from './consoler.component';

describe('ConsolerComponent', () => {
  let component: ConsolerComponent;
  let fixture: ComponentFixture<ConsolerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsolerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
