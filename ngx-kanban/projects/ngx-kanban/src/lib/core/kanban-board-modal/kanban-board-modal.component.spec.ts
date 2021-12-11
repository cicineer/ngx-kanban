import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanBoardModalComponent } from './kanban-board-modal.component';

describe('KanbanBoardModalComponent', () => {
  let component: KanbanBoardModalComponent;
  let fixture: ComponentFixture<KanbanBoardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanBoardModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanBoardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
