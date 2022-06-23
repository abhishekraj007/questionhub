import React, { createContext, useContext } from "react";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Divider,
  Layout,
  IconRegistry,
  Card,
} from "@ui-kitten/components";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Sidebar } from "./src/components/Sidebar";
import { QuestionContainer } from "./src/components/QuestionContainer";
import { useState } from "react";
import { AppTheme } from "./src/data-contracts/contracts";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import Header from "./src/components/Header";
import { useEffect } from "react";
import { IStore, Store } from "./src/stores";
import LoginModal from "./src/components/modals/LoginModal";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./src/screens/Dashboard";
import { AppNavigator } from "./src/components/navigation/AppNavigator";
import Main from "./src/Main";

const store = new Store();

export const StoreContext = createContext<IStore>(undefined);

export default () => {
  return (
    <StoreContext.Provider value={store}>
      <IconRegistry icons={EvaIconsPack} />
      <Main />
    </StoreContext.Provider>
  );
};
