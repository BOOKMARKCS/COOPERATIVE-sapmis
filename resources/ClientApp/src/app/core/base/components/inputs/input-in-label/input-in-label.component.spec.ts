import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputInLabelComponent } from './input-in-label.component';

describe('InputInLabelComponent', () => {
  let component: InputInLabelComponent;
  let fixture: ComponentFixture<InputInLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputInLabelComponent]
    });
    fixture = TestBed.createComponent(InputInLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
