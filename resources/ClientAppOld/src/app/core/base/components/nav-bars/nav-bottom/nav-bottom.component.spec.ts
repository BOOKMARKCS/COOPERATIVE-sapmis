import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBottomComponent } from './nav-bottom.component';

describe('NavBottomComponent', () => {
  let component: NavBottomComponent;
  let fixture: ComponentFixture<NavBottomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBottomComponent]
    });
    fixture = TestBed.createComponent(NavBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
