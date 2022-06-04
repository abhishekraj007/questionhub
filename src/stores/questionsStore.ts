import { makeAutoObservable } from "mobx";
import { getJSQuestions } from "../apis";
import { Question, SidebarItem } from "../data-contracts";

export interface IQuestionStore {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  javasctipt: Question[];
  javasctiptFavorites: Question[];
  setJavascript: (questions: Question[]) => void;
  setJavascriptFavorites: (questions: Question[]) => void;
  getQuestions: (type: SidebarItem) => void;
  toggleFavorite: (item: Question) => void;
}

export class QuestionStore implements IQuestionStore {
  isLoading: boolean = false;
  javasctipt: Question[] = [];
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

          this.setJavascript(this.includeFavorites(data));
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

  setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading;
  };

  setJavascriptFavorites = (data: Question[]) => {
    localStorage.setItem(SidebarItem.JAVASCRIPT_FAVORITE, JSON.stringify(data));
    this.javasctiptFavorites = data;
  };

  toggleFavorite = (item: Question) => {
    // If item is present in fav list remove it

    const foundedIndex = this.javasctiptFavorites.findIndex(
      (fav) => fav.id === item.id
    );

    console.log(foundedIndex);
    let foundedEle = this.javasctiptFavorites[foundedIndex];

    // Present in fav
    if (foundedIndex >= 0) {
      console.log("found an ele");
      // remove from fav
      const newFav = this.javasctiptFavorites.filter(
        (item) => item.id !== foundedEle.id
      );
      console.log(newFav);
      this.setJavascriptFavorites(newFav);
      // toggle state in original array as well
      // foundedEle = {
      //   ...foundedEle,
      //   bookmarked: false,
      // };
      const newRawData = this.javasctipt.map((ele) => {
        if (ele.id === foundedEle.id) {
          return {
            ...ele,
            bookmarked: false,
          };
        }
        return ele;
      });

      this.setJavascript(newRawData);
    } else {
      const nonFavData = this.javasctipt.filter(
        (question) => question.id !== item.id
      );

      this.setJavascript([item, ...nonFavData]);

      this.setJavascriptFavorites([...this.javasctiptFavorites, item]);
    }
  };
}
