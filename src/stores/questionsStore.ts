import { makeAutoObservable } from "mobx";
import { getJSQuestions } from "../apis";
import { Question, SidebarItem } from "../data-contracts";

export interface IQuestionStore {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  javasctipt: Question[];
  setJavascript: (questions: Question[]) => void;
  javasctiptFavorites: Question[];
  setJavascriptFavorites: (questions: Question[]) => void;
  filteredList: Question[];
  setFilteredList: (questions: Question[]) => void;
  getQuestions: (type: SidebarItem) => void;
  toggleFavorite: (item: Question, category?: SidebarItem) => void;
  searchQuestion: (text: string, category?: string) => void;
  clearFilter: (selectedCategory) => void;
}

export class QuestionStore implements IQuestionStore {
  isLoading: boolean = false;
  javasctipt: Question[] = [];
  filteredList: Question[] = [];
  javasctiptFavorites: Question[] = [];

  constructor() {
    makeAutoObservable(this);

    // Get favorites from localstore
    const jsFavString = localStorage.getItem(SidebarItem.JAVASCRIPT_FAVORITE);
    if (jsFavString) {
      const jsFavObject = JSON.parse(jsFavString);
      this.setJavascriptFavorites(jsFavObject);
    }
  }

  includeFavorites = (data: Question[]) => {
    this.javasctiptFavorites.forEach((fav) => {
      const founded = data.findIndex((item) => item.id === fav.id);
      data.splice(founded, 1);
    });

    return [...this.javasctiptFavorites, ...data];
  };

  getQuestions = async (type: SidebarItem) => {
    switch (type) {
      case SidebarItem.JAVASCRIPT:
        try {
          console.log("made fresh api call");
          this.setIsLoading(true);
          const data = await getJSQuestions();
          const currentList = this.includeFavorites(data);

          this.setJavascript(currentList);
          this.setFilteredList(currentList);
        } catch (error) {
          console.log(error);
        } finally {
          this.setIsLoading(false);
        }
    }
  };

  setJavascript = (data: Question[]) => {
    this.javasctipt = data;
  };

  setFilteredList = (data: Question[]) => {
    this.filteredList = data;
  };

  setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  };

  setJavascriptFavorites = (data: Question[]) => {
    localStorage.setItem(SidebarItem.JAVASCRIPT_FAVORITE, JSON.stringify(data));
    this.javasctiptFavorites = data;
  };

  searchQuestion = (text: string, category: SidebarItem) => {
    let filtered = [];

    switch (category) {
      case SidebarItem.JAVASCRIPT_FAVORITE:
        filtered = this.javasctiptFavorites.filter((q) => {
          return q.title.toLocaleLowerCase().includes(text.toLocaleLowerCase());
        });
        break;
      default:
        filtered = this.javasctipt.filter((q) => {
          return q.title.toLocaleLowerCase().includes(text.toLowerCase());
        });
    }

    this.setFilteredList(filtered);
  };

  clearFilter = (selectedCategory: any) => {
    switch (selectedCategory) {
      case SidebarItem.JAVASCRIPT:
        this.setFilteredList(this.javasctipt);
        break;
      case SidebarItem.JAVASCRIPT_FAVORITE:
        this.setFilteredList(this.javasctiptFavorites);
        break;
      default:
        this.setFilteredList(this.javasctipt);
    }
  };

  toggleFavorite = (item: Question, category?: SidebarItem) => {
    // If item is present in fav list remove it

    const foundedIndex = this.javasctiptFavorites.findIndex(
      (fav) => fav.id === item.id
    );

    let foundedEle = this.javasctiptFavorites[foundedIndex];

    if (foundedIndex >= 0) {
      // Remove from fav

      const newJsData = this.javasctipt.map((ele) => {
        if (ele.id === foundedEle.id) {
          return {
            ...ele,
            bookmarked: false,
          };
        }
        return ele;
      });
      this.setJavascript(newJsData);

      const newJsFavData = this.javasctiptFavorites.filter(
        (item) => item.id !== foundedEle.id
      );
      this.setJavascriptFavorites(newJsFavData);

      // Set new list based on category
      if (category === SidebarItem.JAVASCRIPT) {
        this.setFilteredList(newJsData);
      }
      if (category === SidebarItem.JAVASCRIPT_FAVORITE) {
        this.setFilteredList(newJsFavData);
      }
    } else {
      // Add to fav

      const newJsData = this.javasctipt.map((question) => {
        if (question.id === item.id) {
          return {
            ...item,
            bookmarked: true,
          };
        }
        return question;
      });
      this.setJavascript(newJsData);

      const newJsFavData = [
        { ...item, bookmarked: true },
        ...this.javasctiptFavorites,
      ];
      this.setJavascriptFavorites(newJsFavData);

      // Set new list based on category
      if (category === SidebarItem.JAVASCRIPT) {
        this.setFilteredList(newJsData);
      }
      if (category === SidebarItem.JAVASCRIPT_FAVORITE) {
        this.setFilteredList(newJsFavData);
      }
    }
  };
}
