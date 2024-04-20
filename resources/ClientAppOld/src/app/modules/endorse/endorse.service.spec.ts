import { TestBed } from '@angular/core/testing';

import { EndorseService } from './endorse.service';

describe('EndorseService', () => {
  let service: EndorseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndorseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
