import { TestBed } from '@angular/core/testing';

import { NgxKanbanService } from './ngx-kanban.service';

describe('NgxKanbanService', () => {
  let service: NgxKanbanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxKanbanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
