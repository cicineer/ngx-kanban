import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { KanbanUser } from './interfaces/users.interface';
import { KanbanMilestone } from './interfaces/milestone.interface';
import { KanbanBoardModalComponent } from './core/kanban-board-modal/kanban-board-modal.component';
import { ListItemModalComponent } from './core/list-item-modal/list-item-modal.component';
import { KanbanConfig, KANBAN_THEME } from './interfaces/config.interface';
import { KanbanBoard, KanbanBoardList, KanbanBoardListItem, KanbanLabel } from './interfaces/kanban.interface';
import { ListModalComponent } from './core/list-modal/list-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'lib-ngx-kanban',
  templateUrl: './ngx-kanban.component.html',
  styleUrls: [
    './ngx-kanban.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class NgxKanbanComponent implements OnInit {

  @Input('boards') initialBoards: KanbanBoard[] = [];
  @Input('config') config: KanbanConfig = { theme: KANBAN_THEME.MATERIAL };
  @Input('users') users: KanbanUser[] = [];
  @Input('milestones') milestones: KanbanMilestone[] = [];
  @Input('labels') labels: KanbanLabel[] = [];

  @Output('getBoards') getBoardsEmitter = new EventEmitter<KanbanBoard[]>();

  boards: KanbanBoard[] = [];
  board: KanbanBoard = {
    name: '',
    lists: []
  }
  selectedBoardName = '';
  theme: KANBAN_THEME = KANBAN_THEME.MATERIAL;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.initialBoards && this.initialBoards.length > 0) {
      this.boards = this.initialBoards;
      this.board = this.boards[0];
      this.arrangeListsOrder();
      this.arrangeListItemsOrder();
      this.selectedBoardName = this.board.name;
    }
    if (this.config && this.config.theme) {
      this.theme = this.config.theme;
    }
  }

  changeBoard(event: MatSelectChange) {
    this.board.name = event.value;
    const board = this.boards.find(board => board.name === this.board.name);
    if (board) {
      this.board = board;
      this.arrangeListsOrder();
      this.arrangeListItemsOrder();
      this.selectedBoardName = this.board.name;
    }
  }

  arrangeListsOrder() {
    this.board.lists = this.board.lists.sort((a, b) => a.order - b.order);
  }

  arrangeListItemsOrder() {
    for (let i = 0; i < this.board.lists.length; i++) {
      const list = this.board.lists[i];
      if (list.items) {
        list.items = list.items.sort((a, b) => a.order - b.order);
      }
    }
  }

  createBoard() {
    const dialogRef = this.dialog.open(KanbanBoardModalComponent, {
      data: {
        boards: this.boards
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._snackBar.open('Board with the same already exists', 'Close', {
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    });
  }

  async editBoard() {
    const dialogRef = this.dialog.open(KanbanBoardModalComponent, {
      data: {
        board: this.board,
        boards: this.boards
      }
    });
    try {
      const result = await dialogRef.afterClosed().toPromise();
      if (result) {
        const index = this.boards.findIndex(board => board.identifier === this.board.identifier);
        this.boards[index].name = result;
        this.board.name = result;
        this.emitBoards();
      }
    } catch (e) {
    }
  }

  deleteBoard() {
    if (confirm('Are you sure you want to delete the board?')) {
      this.boards = this.boards.filter(board => board.identifier !== this.board.identifier);
      if (this.boards[0]) {
        this.board = this.boards[0];
        this.selectedBoardName = this.board.name;
      }
      this.emitBoards();
    }
  }

  createList() {
    const dialogRef = this.dialog.open(ListModalComponent, {
      data: {
        labels: this.labels
      }
    });
    dialogRef.afterClosed().subscribe((result: KanbanBoardList) => {
      if (result) {
        const exists = this.board.lists.findIndex(list => list.label.name === result.label.name) > -1;
        if (exists) {
          this._snackBar.open('Board with the same label already exists...', 'Close', {
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        } else {
          let length = this.board.lists.length;
          this.board.lists.unshift({
            label: result.label,
            order: length,
            items: []
          });
          this.board.lists[length].order++;
          this.arrangeListsOrder();
          this.emitBoards();
        }
      }
    });
  }

  async addListItem(list: KanbanBoardList) {
    const dialogRef = this.dialog.open(ListItemModalComponent);
    try {
      const result: KanbanBoardListItem = await dialogRef.afterClosed().toPromise();
      if (result) {
        if (list.items) {
          list.items.unshift({
            title: result.title,
            description: result.description,
            assignee: result.assignee,
            milestone: result.milestone,
            label: result.label,
            order: 1
          });
          list.items.forEach(item => item.order++);
        }
        this.arrangeListItemsOrder();
        this.emitBoards();
      }
    } catch (e) {
    }
  }

  async editListItem(item: KanbanBoardListItem, list: KanbanBoardList) {
    const dialogRef = this.dialog.open(ListItemModalComponent, {
      data: item
    });
    try {
      const result: KanbanBoardListItem = await dialogRef.afterClosed().toPromise();
      if (result) {
        if (list.items) {
          const index = list.items.findIndex(i => i.identifier === item.identifier);
          list.items[index] = result;
          const listIndex = this.board.lists.findIndex(l => l.identifier === list.identifier);
          this.board.lists[listIndex] = list;
        }
      }
      this.emitBoards();
    } catch (e) {
    }
  }

  emitBoards() {
    this.getBoardsEmitter.emit(this.boards);
  }

  makeid() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

}
