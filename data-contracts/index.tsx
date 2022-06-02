export interface Question {
  id?: string;
  title: string;
  content: string[];
}

export enum SidebarItem {
  JAVASCRIPT = 0,
  REACT = 1,
}

export enum AppTheme {
  LIGHT = "LIGHT",
  DARK = "DARK",
}
