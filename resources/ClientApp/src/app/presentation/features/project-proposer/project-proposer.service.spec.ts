import { TestBed } from '@angular/core/testing';

import { ProjectProposerService } from './project-proposer.service';

describe('ProjectProposerService', () => {
  let service: ProjectProposerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectProposerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
