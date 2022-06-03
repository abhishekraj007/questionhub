import { IndexPath } from "@ui-kitten/components";
import { makeAutoObservable } from "mobx";

export interface IMenuStore {
  selectedMenu: IndexPath;
  setSelectedMenu: (selectedMenu: IndexPath) => void;
}

export class MenuStore implements IMenuStore {
  selectedMenu: IndexPath = new IndexPath(0);

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedMenu(selectedMenu) {
    this.selectedMenu = selectedMenu;
  }
}
