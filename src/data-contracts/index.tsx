export interface Question {
  id?: string;
  title: string;
  content: string[];
  bookmarked?: boolean;
  category?: string;
}

export enum SidebarItem {
  JAVASCRIPT = "JAVASCRIPT",
  JAVASCRIPT_FAVORITE = "JAVASCRIPT_FAVORITE",
  REACT = "REACT",
  REACT_FAVORITE = "REACT_FAVORITE",
}

export enum AppTheme {
  LIGHT = "LIGHT",
  DARK = "DARK",
}
