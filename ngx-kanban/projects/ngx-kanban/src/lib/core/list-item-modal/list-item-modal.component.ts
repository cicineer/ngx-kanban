import { Component, Inject, OnInit } from '@angular/core';
import { KanbanBoardListItem, KanbanLabel } from '../../interfaces/kanban.interface';
import { KanbanUser } from '../../interfaces/users.interface';
import { KanbanMilestone } from '../../interfaces/milestone.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lib-list-item-modal',
  templateUrl: './list-item-modal.component.html',
  styleUrls: ['./list-item-modal.component.css']
})
export class ListItemModalComponent implements OnInit {

  item: KanbanBoardListItem = {
    title: '',
    description: '',
    order: 0
  }

  title = 'Create item';
  users: KanbanUser[] = [];
  milestones: KanbanMilestone[] = [];
  labels: KanbanLabel[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: KanbanBoardListItem) { }

  ngOnInit(): void {
    if (this.data) {
      this.title = 'Edit item';
      this.item.title = this.data.title;
      if (this.data.description) {
        this.item.description = this.data.description;
      }
      if (this.data.assignee) {
        this.item.assignee = this.data.assignee;
      }
      if (this.data.milestone) {
        this.item.milestone = this.data.milestone;
      }
      if (this.data.label) {
        this.item.label = this.data.label;
      }
    }
  }

}
