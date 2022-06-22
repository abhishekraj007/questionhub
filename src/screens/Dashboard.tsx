import React, { useContext, useEffect } from "react";
import { Divider, Layout } from "@ui-kitten/components";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Sidebar } from "../components/Sidebar";
import { QuestionContainer } from "../components/QuestionContainer";
import Header from "../components/Header";
import { IStore } from "../stores";
import LoginModal from "../components/LoginModal";
import { StoreContext } from "../../App";
import { isItMobile } from "../utils";
import { observer } from "mobx-react-lite";

interface HomeProps {
  store?: IStore;
}

function Home({}: HomeProps) {
  const { menuStore, authStore } = useContext(StoreContext);
  console.log(authStore);

  const { showSidebar } = menuStore;

  const { width: screenWidth } = useWindowDimensions();

  useEffect(() => {
    authStore.checkUserLoggedInStatus();
    menuStore.loadTheme();
  }, []);

  const renderSidebar = () => {
    if (!isItMobile) {
      return (
        <View
          style={{
            width: "280px",
          }}
        >
          <Sidebar />
        </View>
      );
    }

    if (showSidebar) {
      return (
        <View
          style={{
            width: "280px",
            position: "absolute",
            zIndex: 11,
            height: "100%",
          }}
        >
          <Sidebar />
        </View>
      );
    }

    return null;
  };

  const questionContainerWidth = isItMobile ? "100%" : `${screenWidth - 280}px`;

  return (
    <View>
      <Header />
      <Divider />
      <Layout style={styles.container} level="3">
        {renderSidebar()}

        <View
          style={{
            width: questionContainerWidth,
          }}
        >
          <QuestionContainer />
        </View>
      </Layout>
      <LoginModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
  },
});

export default observer(Home);
