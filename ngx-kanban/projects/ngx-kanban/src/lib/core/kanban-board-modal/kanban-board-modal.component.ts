import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KanbanBoard } from 'projects/ngx-kanban/src/public-api';

@Component({
  selector: 'lib-kanban-board-modal',
  templateUrl: './kanban-board-modal.component.html',
  styleUrls: ['./kanban-board-modal.component.css']
})
export class KanbanBoardModalComponent implements OnInit {

  title = 'Create board';
  name = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { board: KanbanBoard, boards: KanbanBoard[] },
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.data.board) {
      this.title = 'Edit board';
      this.name = this.data.board.name;
    }
  }

  disabled() {
    const exists = this.data.boards.findIndex(board => this.name === board.name) > -1;
    console.log(exists);
    return exists;
  }

}
