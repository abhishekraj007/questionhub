import { AuthStore, IAuthStore } from "./authStore";
import { IMenuStore, MenuStore } from "./menuStore";
import { INotesStore, NotesStore } from "./notesStore";
import { IQuestionStore, QuestionStore } from "./questionsStore";

export interface IStore {
  menuStore: IMenuStore;
  questionStore: IQuestionStore;
  authStore: IAuthStore;
  notesStore: INotesStore;
}

export class Store implements IStore {
  menuStore: IMenuStore;
  questionStore: IQuestionStore;
  authStore: IAuthStore;
  notesStore: INotesStore;

  constructor() {
    this.menuStore = new MenuStore();
    this.questionStore = new QuestionStore();
    this.authStore = new AuthStore();
    this.notesStore = new NotesStore();
  }
}
