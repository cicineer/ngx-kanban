import { NgModule } from '@angular/core';
import { NgxKanbanComponent } from './ngx-kanban.component';
import { KanbanListComponent } from './core/kanban-list/kanban-list.component';
import { KanbanListItemComponent } from './core/kanban-list-item/kanban-list-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { KanbanBoardModalComponent } from './core/kanban-board-modal/kanban-board-modal.component';
import { ListItemModalComponent } from './core/list-item-modal/list-item-modal.component';
import { ListModalComponent } from './core/list-modal/list-modal.component';

@NgModule({
  declarations: [
    NgxKanbanComponent,
    KanbanListComponent,
    KanbanListItemComponent,
    KanbanBoardModalComponent,
    ListItemModalComponent,
    ListModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule
  ],
  exports: [
    NgxKanbanComponent
  ]
})
export class NgxKanbanModule { }
