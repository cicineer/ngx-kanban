import { Component, OnInit } from '@angular/core';
import { KanbanLabel, LABEL_COLOR } from 'projects/ngx-kanban/src/public-api';
import { KanbanBoard, KanbanConfig, KANBAN_THEME } from 'projects/ngx-kanban/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngx-kanban-app';
  config: KanbanConfig = {
    theme: KANBAN_THEME.MATERIAL,
    width: '80vw'
  };
  kanbans: KanbanBoard[] = [];
  labels: KanbanLabel[] = [{
    name: 'TODO',
    identifier: 'TODO1',
    color: LABEL_COLOR.NULL
  }, {
    name: 'PROGRESS',
    identifier: 'PROGRESS1',
    color: LABEL_COLOR.GREEN_LIGHT
  }, {
    name: 'BUG',
    identifier: 'BUG1',
    color: LABEL_COLOR.RED_DARK
  }, {
    name: 'TESTING',
    identifier: 'TESTING1',
    color: LABEL_COLOR.BLUE_LIGHT
  }];

  ngOnInit() {
    const kanbansFromStorage = localStorage.getItem('kanbans');
    if (kanbansFromStorage){
      this.kanbans = JSON.parse(kanbansFromStorage);
    }
  }

  getBoards(boards: KanbanBoard[]) {
    localStorage.setItem('kanbans', JSON.stringify(boards));
  }
}
