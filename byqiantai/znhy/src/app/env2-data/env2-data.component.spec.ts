import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Env2DataComponent } from './env2-data.component';

describe('Env2DataComponent', () => {
  let component: Env2DataComponent;
  let fixture: ComponentFixture<Env2DataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Env2DataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Env2DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
