import React from "react";
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
import { AppTheme } from "./src/data-contracts";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import Header from "./src/components/Header";
import { useEffect } from "react";
import { Store } from "./src/stores";
import LoginModal from "./src/components/LoginModal";

const store = new Store();

export default () => {
  const { width: screenWidth } = useWindowDimensions();
  const userTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState<AppTheme>(
    (userTheme as AppTheme) ?? AppTheme.LIGHT
  );

  console.log(store);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={theme === AppTheme.LIGHT ? eva.light : eva.dark}
      >
        <Header store={store} theme={theme} setTheme={setTheme} />
        <Divider />
        <Layout style={styles.container} level="3">
          <View
            style={{
              width: "280px",
            }}
          >
            <Sidebar store={store} />
          </View>
          <View
            style={{
              width: `${screenWidth - 280}px`,
            }}
          >
            <QuestionContainer store={store} />
          </View>
        </Layout>
        <LoginModal store={store} />
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
  },
});
