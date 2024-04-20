import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleStudentsComponent } from './responsible-students.component';

describe('ResponsibleStudentsComponent', () => {
  let component: ResponsibleStudentsComponent;
  let fixture: ComponentFixture<ResponsibleStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsibleStudentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponsibleStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
