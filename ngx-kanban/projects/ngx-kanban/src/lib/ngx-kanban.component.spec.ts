import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxKanbanComponent } from './ngx-kanban.component';

describe('NgxKanbanComponent', () => {
  let component: NgxKanbanComponent;
  let fixture: ComponentFixture<NgxKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxKanbanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
