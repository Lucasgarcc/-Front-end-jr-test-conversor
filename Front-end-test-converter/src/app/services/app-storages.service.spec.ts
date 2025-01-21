import { TestBed } from '@angular/core/testing';

import { AppStoragesService } from './app-storages.service';

describe('AppStoragesService', () => {
  let service: AppStoragesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppStoragesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
