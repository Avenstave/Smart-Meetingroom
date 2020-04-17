import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumituerDataComponent } from './humituer-data.component';

describe('HumitureDataComponent', () => {
  let component: HumituerDataComponent;
  let fixture: ComponentFixture<HumituerDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HumituerDataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumituerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
