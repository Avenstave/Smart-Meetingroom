import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgDataComponent } from './msg-data.component';

describe('MsgDataComponent', () => {
  let component: MsgDataComponent;
  let fixture: ComponentFixture<MsgDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
