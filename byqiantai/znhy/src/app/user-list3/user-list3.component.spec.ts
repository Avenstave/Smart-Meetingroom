import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserList3Component } from './user-list3.component';

describe('UserList3Component', () => {
  let component: UserList3Component;
  let fixture: ComponentFixture<UserList3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserList3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserList3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
