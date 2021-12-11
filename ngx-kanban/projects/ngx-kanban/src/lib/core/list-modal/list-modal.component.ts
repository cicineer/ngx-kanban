import { Component, Inject, OnInit } from '@angular/core';
import { KanbanBoardList, KanbanLabel } from '../../interfaces/kanban.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lib-list-modal',
  templateUrl: './list-modal.component.html',
  styleUrls: ['./list-modal.component.css']
})
export class ListModalComponent implements OnInit {

  list: KanbanBoardList = {
    label: {
      name: ''
    },
    order: 0
  }

  labels: KanbanLabel[] = [];

  title = 'Create list';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { list: KanbanBoardList, labels: KanbanLabel[] }) { }

  ngOnInit(): void {
    this.labels = this.data.labels;
    if (this.data.list) {
      const list = this.data.list;
      this.title = 'Edit list';
      this.list.label = list.label;
      if (list.label) {
        this.list.label = list.label;
      }
    }
  }

}
