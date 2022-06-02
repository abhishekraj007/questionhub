import React from "react";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Divider,
  IndexPath,
  Layout,
  IconRegistry,
} from "@ui-kitten/components";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Sidebar } from "./components/Sidebar";
import { QuestionContainer } from "./components/QuestionContainer";
import { useState } from "react";
import { AppTheme, SidebarItem } from "./data-contracts";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import Header from "./components/Header";
import { useEffect } from "react";

export default () => {
  const { width: screenWidth } = useWindowDimensions();
  const userTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState<AppTheme>(
    (userTheme as AppTheme) ?? AppTheme.LIGHT
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const [selectedMenu, setSelectedMenu] = useState(
    new IndexPath(SidebarItem.JAVASCRIPT)
  );

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={theme === AppTheme.LIGHT ? eva.light : eva.dark}
      >
        <Header theme={theme} setTheme={setTheme} />
        <Divider />
        <Layout style={styles.container}>
          <View
            style={{
              width: "280px",
            }}
          >
            <Sidebar
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          </View>
          <View
            style={{
              width: `${screenWidth - 280}px`,
            }}
          >
            <QuestionContainer selectedMenu={selectedMenu} />
          </View>
        </Layout>
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
