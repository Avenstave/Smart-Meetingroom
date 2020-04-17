import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvDataComponent } from './env-data.component';

describe('EnvDataComponent', () => {
  let component: EnvDataComponent;
  let fixture: ComponentFixture<EnvDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
