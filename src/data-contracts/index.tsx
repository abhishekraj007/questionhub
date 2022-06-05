import { IndexPath } from "@ui-kitten/components";

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

export const getCategory = (indexPath: IndexPath) => {
  if (indexPath.row === 1 && indexPath.section === 0) {
    return SidebarItem.JAVASCRIPT_FAVORITE;
  } else if (
    indexPath.row === 0 &&
    (indexPath.section === 0 || indexPath.section === undefined)
  ) {
    return SidebarItem.JAVASCRIPT;
  } else if (
    indexPath.row === 1 &&
    (indexPath.section === 0 || indexPath.section === undefined)
  ) {
    return SidebarItem.REACT;
  }
};

export enum AppTheme {
  LIGHT = "LIGHT",
  DARK = "DARK",
}
