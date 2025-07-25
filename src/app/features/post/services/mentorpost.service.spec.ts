import { TestBed } from '@angular/core/testing';

import { MentorpostService } from './mentorpost.service';

describe('MentorpostService', () => {
  let service: MentorpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentorpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
