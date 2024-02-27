import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProposerComponent } from './project-proposer.component';

describe('ProjectProposerComponent', () => {
  let component: ProjectProposerComponent;
  let fixture: ComponentFixture<ProjectProposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectProposerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectProposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
