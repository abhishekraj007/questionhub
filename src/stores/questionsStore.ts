import { makeAutoObservable } from "mobx";
import { apiGetQuestions, URLS, apiUpdateUser, apiGetUserData } from "../apis";
import {
  Favorites,
  getCategoryKey,
  Question,
  questionCategoriesList,
  QuestionMap,
  SidebarItem,
} from "../data-contracts";

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
  getQuestions: (type: SidebarItem, userId?: string) => void;
  toggleFavorite: (
    item: Question,
    category?: SidebarItem,
    userId?: string
  ) => void;
  searchQuestion: (text: string, category?: string) => void;
  clearFilter: (selectedCategory) => void;
  questions?: {
    js: IQModel;
    react: IQModel;
  };
  userFavs: Question[];
  setUserFavs: (data: Question[], category: SidebarItem) => void;
  questionsMap: any;
}

export class QuestionStore implements IQuestionStore {
  isLoading: boolean = false;
  filteredList: Question[] = [];
  allFavorites: Question[] = [];
  javascript: IQModel = {
    data: [],
    fav: [],
  };

  questionsMap = {};

  react: IQModel = {
    data: [],
    fav: [],
  };
  userFavs: Question[] = [];

  // This is when user loads the page
  setUserFavs = (favList: Question[], category?: SidebarItem) => {
    // Add user bookmarked list
    this.userFavs = favList;
    const { getMenuKey, setMenuKey } = getCategoryKey(category);

    // Filter bookmarked items by category
    const favs = (favList ?? [])
      .map((item) => {
        if (item.type === category) {
          return { ...item, bookmarked: true };
        }
      })
      .filter((item) => item);

    const currentListIncludingFav = this.includeFavorites(
      this[getMenuKey].data,
      favs
    );

    this[setMenuKey]({
      fav: favs,
      data: currentListIncludingFav,
    });
    this.setFilteredList(currentListIncludingFav);
    this.setFavsForAllCategories(favList, category);

    // Set Favs for all categories
  };

  setFavsForAllCategories = (favList, excludeCurrentCategory) => {
    const categories = [SidebarItem.JAVASCRIPT, SidebarItem.REACT].filter(
      (item) => item !== excludeCurrentCategory
    );

    categories.forEach((category) => {
      const { getMenuKey, setMenuKey } = getCategoryKey(category);

      this[setMenuKey]({
        data: this[getMenuKey].data,
        fav: favList
          ?.map((item) => {
            if (item.type === category) {
              return item;
            }
          })
          .filter((item) => item),
      });
    });
  };

  constructor() {
    makeAutoObservable(this);
  }

  includeFavorites = (data: Question[], favs: Question[]) => {
    favs.forEach((fav) => {
      const founded = data.findIndex((item) => item.id === fav.id);
      data.splice(founded, 1);
    });

    return [...favs, ...data];
  };

  getQuestions = async (category: SidebarItem, userId?: string) => {
    try {
      console.log("made fresh api call");
      this.setIsLoading(true);
      let data = [];

      switch (category) {
        case SidebarItem.JAVASCRIPT:
          // Get js questions and set to store
          data = await apiGetQuestions(URLS.js);
          this.setJavascript({
            ...this.javascript,
            data,
          });

          // Add data to questionMap
          data.forEach((item) => {
            this.questionsMap[item?.id] = item;
          });

          // If user is loged in get bookmarked Item
          // Otherwise there is no bookmared

          if (userId) {
            const userSnap = await apiGetUserData(userId);
            this.setUserFavs(userSnap.data().favs, category);
          } else {
            this.setFilteredList(data);
          }

          break;
        case SidebarItem.REACT:
          data = await apiGetQuestions(URLS.react);

          this.setReact({
            ...this.react,
            data,
          });

          data.forEach((item) => {
            this.questionsMap[item?.id] = item;
          });

          if (this.userFavs?.length) {
            this.setUserFavs(this.userFavs, category);
          } else {
            this.setFilteredList(data);
          }

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

  toggleFavorite = (
    item: Question,
    category?: SidebarItem,
    userId?: string
  ) => {
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
    const allFavs = [...this.javascript.fav, ...this.react.fav];

    this.setAllFavorites(allFavs);

    apiUpdateUser({
      id: userId,
      favs: allFavs,
    });

    // localStorage.setItem(getMenuKey, JSON.stringify(newFavList));
  };
}
