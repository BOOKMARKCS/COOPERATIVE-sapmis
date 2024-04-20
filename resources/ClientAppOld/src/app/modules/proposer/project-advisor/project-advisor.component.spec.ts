import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAdvisorComponent } from './project-advisor.component';

describe('ProjectAdvisorComponent', () => {
  let component: ProjectAdvisorComponent;
  let fixture: ComponentFixture<ProjectAdvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectAdvisorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
