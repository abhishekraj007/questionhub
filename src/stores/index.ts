import { IMenuStore, MenuStore } from "./menuStore";

export interface IStore {
  menuStore: IMenuStore;
}

export class Store implements IStore {
  menuStore: IMenuStore;

  constructor() {
    this.menuStore = new MenuStore();
  }
}
