import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Env3DataComponent } from './env3-data.component';

describe('Env3DataComponent', () => {
  let component: Env3DataComponent;
  let fixture: ComponentFixture<Env3DataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Env3DataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Env3DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
