import { AuthStore, IAuthStore } from "./authStore";
import { IMenuStore, MenuStore } from "./menuStore";
import { IQuestionStore, QuestionStore } from "./questionsStore";

export interface IStore {
  menuStore: IMenuStore;
  questionStore: IQuestionStore;
  authStore: IAuthStore;
}

export class Store implements IStore {
  menuStore: IMenuStore;
  questionStore: IQuestionStore;
  authStore: IAuthStore;

  constructor() {
    this.menuStore = new MenuStore();
    this.questionStore = new QuestionStore();
    this.authStore = new AuthStore();
  }
}
