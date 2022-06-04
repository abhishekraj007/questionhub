import { IMenuStore, MenuStore } from "./menuStore";
import { IQuestionStore, QuestionStore } from "./questionsStore";

export interface IStore {
  menuStore: IMenuStore;
  questionStore: IQuestionStore;
}

export class Store implements IStore {
  menuStore: IMenuStore;
  questionStore: IQuestionStore;

  constructor() {
    this.menuStore = new MenuStore();
    this.questionStore = new QuestionStore();
  }
}
