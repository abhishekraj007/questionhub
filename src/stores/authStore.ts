import { IndexPath } from "@ui-kitten/components";
import { makeAutoObservable } from "mobx";
import { User } from "../data-contracts";

export interface IAuthStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (login: boolean) => void;
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
  clearUser: () => void;
  showLoginModal: boolean;
  setShowLoginModal: (value: boolean) => void;
}

export class AuthStore implements IAuthStore {
  isLoggedIn: boolean = false;
  user: User = undefined;
  showLoginModal: boolean = false;

  constructor() {
    makeAutoObservable(this);

    // If user is already logged in
    // For now use localstorage later can be change with cookies
    const user = localStorage.getItem("user");
    if (user) {
      this.setUser(JSON.parse(user));
      this.setIsLoggedIn(true);
    }
  }

  setUser = (user: User) => {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  };

  clearUser = () => {
    this.user = undefined;
    localStorage.removeItem("user");
  };

  setIsLoggedIn = (login: boolean) => {
    this.isLoggedIn = login;
  };

  logout = () => {
    this.setIsLoggedIn(false);
    this.clearUser();
    window.location.reload();
  };

  setShowLoginModal = (value: boolean) => {
    this.showLoginModal = value;
  };
}
