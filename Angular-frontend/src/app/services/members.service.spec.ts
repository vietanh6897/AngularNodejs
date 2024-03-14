import { TestBed } from '@angular/core/testing';

import { MembersService } from './members.service';
import { HttpClientModule } from '@angular/common/http';

describe('MembersService', () => {
  let service: MembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(MembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
