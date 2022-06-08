import { makeAutoObservable } from "mobx";
import { apiGetQuestions, URLS } from "../apis";
import { getCategoryKey, Question, SidebarItem } from "../data-contracts";

interface IQModel {
  data: Question[];
  fav: Question[];
}

export interface IQuestionStore {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  javascript: IQModel;
  // javascript: Question[];
  setJavascript: (questions: IQModel) => void;
  // javascriptFavorites: Question[];
  // setJavascriptFavorites: (questions: Question[]) => void;
  react: IQModel;
  setReact: (data: IQModel) => void;
  filteredList: Question[];
  setFilteredList: (questions: Question[]) => void;
  allFavorites: Question[];
  setAllFavorites: (questions: Question[]) => void;
  getQuestions: (type: SidebarItem) => void;
  toggleFavorite: (item: Question, category?: SidebarItem) => void;
  searchQuestion: (text: string, category?: string) => void;
  clearFilter: (selectedCategory) => void;
  questions?: {
    js: IQModel;
    react: IQModel;
  };
}

export class QuestionStore implements IQuestionStore {
  isLoading: boolean = false;
  filteredList: Question[] = [];
  allFavorites: Question[] = [];
  javascript: IQModel = {
    data: [],
    fav: [],
  };

  react: IQModel = {
    data: [],
    fav: [],
  };

  constructor() {
    makeAutoObservable(this);

    // Get favorites from localstore
    const jsFavString = localStorage.getItem("javascript");
    const reactFavString = localStorage.getItem("react");

    if (jsFavString) {
      this.setJavascript({
        ...this.javascript,
        fav: JSON.parse(jsFavString),
      });
      this.setAllFavorites([...this.allFavorites, JSON.parse(jsFavString)]);
    }

    if (reactFavString) {
      this.setReact({
        ...this.react,
        fav: JSON.parse(reactFavString),
      });
      this.setAllFavorites([...this.allFavorites, JSON.parse(reactFavString)]);
    }
  }

  includeFavorites = (data: Question[], favs: Question[]) => {
    favs.forEach((fav) => {
      const founded = data.findIndex((item) => item.id === fav.id);
      data.splice(founded, 1);
    });

    return [...favs, ...data];
  };

  getQuestions = async (type: SidebarItem) => {
    try {
      console.log("made fresh api call");
      this.setIsLoading(true);
      let data = [];

      switch (type) {
        case SidebarItem.JAVASCRIPT:
          data = await apiGetQuestions(URLS.js);
          const currentJsListIncludingFavs = this.includeFavorites(
            data,
            this.javascript.fav
          );
          this.setJavascript({
            ...this.javascript,
            data: currentJsListIncludingFavs,
          });
          this.setFilteredList(currentJsListIncludingFavs);
          // console.log("Made js call", currentJsListIncludingFavs);
          break;
        case SidebarItem.REACT:
          data = await apiGetQuestions(URLS.react);
          const currentDataIncludingFavs = this.includeFavorites(
            data,
            this.react.fav
          );
          this.setReact({
            ...this.react,
            data: currentDataIncludingFavs,
          });
          this.setFilteredList(currentDataIncludingFavs);
          // console.log("made react call", currentDataIncludingFavs);
          break;
        default:
          console.log("Made no call");
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  setJavascript = (data: IQModel) => {
    this.javascript = data;
  };

  setReact = (data: IQModel) => {
    this.react = data;
  };

  setFilteredList = (data: Question[]) => {
    this.filteredList = data;
  };

  setAllFavorites = (data: Question[]) => {
    this.allFavorites = data;
  };

  setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  };

  searchQuestion = (text: string, category: SidebarItem) => {
    let filtered = [];
    const { getMenuKey } = getCategoryKey(category);

    switch (category) {
      case SidebarItem.JAVASCRIPT:
      case SidebarItem.REACT:
        filtered = this[getMenuKey].data.filter((q) => {
          return q.title.toLocaleLowerCase().includes(text.toLowerCase());
        });
        break;
      case SidebarItem.ALL_FAVORITES:
        filtered = this.allFavorites.filter((q) => {
          return q.title.toLocaleLowerCase().includes(text.toLowerCase());
        });
        break;
      default:
        filtered = this[getMenuKey].fav?.filter((q) => {
          return q.title.toLocaleLowerCase().includes(text.toLocaleLowerCase());
        });
    }

    this.setFilteredList(filtered);
  };

  clearFilter = (category: SidebarItem) => {
    const { getMenuKey } = getCategoryKey(category);

    switch (category) {
      case SidebarItem.JAVASCRIPT:
      case SidebarItem.REACT:
        this.setFilteredList(this[getMenuKey].data);
        break;
      case SidebarItem.ALL_FAVORITES:
        this.setFilteredList(this.allFavorites);
        break;
      default:
        this.setFilteredList(this[getMenuKey].fav);
    }
  };

  toggleFavorite = (item: Question, category?: SidebarItem) => {
    // If item is present in fav list remove it
    const { getMenuKey, setMenuKey } = getCategoryKey(category);

    const foundedIndex = this[getMenuKey].fav.findIndex(
      (fav) => fav.id === item.id
    );

    let foundedEle = this[getMenuKey].fav[foundedIndex];
    let newList = [];
    let newFavList = [];

    if (foundedIndex >= 0) {
      // Remove from fav

      newList = this[getMenuKey].data.map((ele) => {
        if (ele.id === foundedEle.id) {
          return {
            ...ele,
            bookmarked: false,
          };
        }
        return ele;
      });

      newFavList = this[getMenuKey].fav.filter(
        (item) => item.id !== foundedEle.id
      );

      this[setMenuKey]({ data: newList, fav: newFavList });
    } else {
      // Add to fav
      newList = this[getMenuKey].data.map((question) => {
        if (question.id === item.id) {
          return {
            ...item,
            bookmarked: true,
          };
        }
        return question;
      });

      newFavList = [{ ...item, bookmarked: true }, ...this[getMenuKey].fav];

      this[setMenuKey]({ data: newList, fav: newFavList });
    }

    switch (category) {
      case SidebarItem.JAVASCRIPT:
      case SidebarItem.REACT:
        this.setFilteredList(newList);
        break;
      default:
        this.setFilteredList(newFavList);
    }
    this.setAllFavorites([...this.javascript.fav, ...this.react.fav]);
    localStorage.setItem(getMenuKey, JSON.stringify(newFavList));
  };
}
