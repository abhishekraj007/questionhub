import React from "react";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  Divider,
  Icon,
  IndexPath,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
  IconRegistry,
} from "@ui-kitten/components";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Sidebar } from "./components/Sidebar";
import { QuestionContainer } from "./components/QuestionContainer";
import { useState } from "react";
import { SidebarItem } from "./data-contracts";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

export enum AppTheme {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export default () => {
  const { width: screenWidth } = useWindowDimensions();
  const [theme, setTheme] = useState<AppTheme>(AppTheme.LIGHT);

  const [selectedMenu, setSelectedMenu] = useState(
    new IndexPath(SidebarItem.JAVASCRIPT)
  );

  const ToggleIcon = (props) => (
    <Icon {...props} name={theme === AppTheme.LIGHT ? "moon" : "sun"} />
  );

  const renderToggleTheme = () => {
    return (
      <TopNavigationAction
        onPress={() => {
          setTheme(theme === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT);
        }}
        icon={ToggleIcon}
      />
    );
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={theme === AppTheme.LIGHT ? eva.light : eva.dark}
      >
        <TopNavigation
          title={"Interview Questions"}
          accessoryRight={renderToggleTheme}
        />
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
