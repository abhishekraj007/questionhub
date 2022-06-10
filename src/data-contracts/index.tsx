import { IndexPath } from "@ui-kitten/components";

export interface Question {
  id?: string;
  title: string;
  content: string[];
  bookmarked?: boolean;
  type?: string;
}
export interface User {
  id: string;
  displayName?: string;
  email?: string;
}

export interface Favorites {
  id: string;
  type: string;
}

export enum SidebarItem {
  JAVASCRIPT = "JAVASCRIPT",
  JAVASCRIPT_FAVORITE = "JAVASCRIPT_FAVORITE",
  REACT = "REACT",
  REACT_FAVORITE = "REACT_FAVORITE",
  ALL_FAVORITES = "ALL_FAVORITES",
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
    (indexPath.row === 1 &&
      (indexPath.section === 0 || indexPath.section === undefined)) ||
    (indexPath.row === 0 && indexPath.section === 1)
  ) {
    return SidebarItem.REACT;
  } else if (indexPath.row === 1 && indexPath.section === 1) {
    return SidebarItem.REACT_FAVORITE;
  } else if (indexPath.row === 2 && indexPath.section === undefined) {
    return SidebarItem.ALL_FAVORITES;
  }
};

export const getCategoryKey = (category: SidebarItem) => {
  // If item is present in fav list remove it
  let getMenuKey = "javascript";
  let setMenuKey = "setJavascript";

  if (category === SidebarItem.JAVASCRIPT_FAVORITE) {
    getMenuKey = "javascript";
    setMenuKey = "setJavascript";
  }

  if (category === SidebarItem.REACT) {
    getMenuKey = "react";
    setMenuKey = "setReact";
  }
  if (category === SidebarItem.REACT_FAVORITE) {
    getMenuKey = "react";
    setMenuKey = "setReact";
  }

  return { getMenuKey, setMenuKey };
};

export enum AppTheme {
  LIGHT = "LIGHT",
  DARK = "DARK",
}
