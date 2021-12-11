export interface KanbanConfig {
    theme?: KANBAN_THEME;
    width?: string;
    height?: string;
}

export enum KANBAN_THEME {
    MATERIAL = 'material',
    BOOTSTRAP = 'bootstrap'
}