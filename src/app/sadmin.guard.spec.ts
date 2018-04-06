import { TestBed, async, inject } from '@angular/core/testing';

import { SadminGuard } from './sadmin.guard';

describe('SadminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SadminGuard]
    });
  });

  it('should ...', inject([SadminGuard], (guard: SadminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
