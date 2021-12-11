import { KanbanMilestone } from "./milestone.interface";
import { KanbanUser } from "./users.interface";

export interface KanbanBoard {
    identifier?: string;
    name: string;
    lists: KanbanBoardList[];
}

export interface KanbanBoardList {
    identifier?: string;
    label: KanbanLabel;
    order: number;
    items?: KanbanBoardListItem[];
}

export interface KanbanLabel {
    identifier?: string;
    name: string;
    color?: LABEL_COLOR;
}

export interface KanbanBoardListItem {
    identifier?: string;
    title: string;
    label?: KanbanLabel;
    order: number;
    description?: string;
    assignee?: KanbanUser;
    milestone?: KanbanMilestone;
}

export enum LABEL_COLOR {
    GREY = '#7F8C8D',
    BLUE_LIGHT = '#85C1E9',
    BLUE_DARK = '#21618C',
    RED_LIGHT = '#CD6155',
    RED_DARK = '#7B241C',
    GREEN_LIGHT = '#7DCEA0',
    GREEN_DARK = '#117864',
    WHITE = '#FFF',
    BLACK = '#000',
    ORANGE = '#117864',
    BROWN = '#117864',
    NULL = ''
}