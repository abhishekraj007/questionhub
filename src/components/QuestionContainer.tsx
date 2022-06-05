import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform, useWindowDimensions } from "react-native";
import QuestionItem from "./QuestionItem";
import QuestionItemWeb from "./QuestionItemWeb";
import Loader from "./Loader";
import { Divider, Input, List } from "@ui-kitten/components";
import QuestionDetail from "./QuestionDetail";
import { Question, SidebarItem } from "../data-contracts";
import { observer } from "mobx-react-lite";
import { IStore } from "../stores";
import QuestionList from "./QuestionList";

interface Props {
  store: IStore;
}

let searchTimer;

export const QuestionContainer = observer(({ store }: Props) => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();
  const { height: screenHeight } = useWindowDimensions();

  const [value, setValue] = useState("");

  const {
    menuStore: { selectedMenu },
    questionStore: {
      isLoading,
      getQuestions,
      toggleFavorite,
      searchQuestion,
      filteredList,
    },
  } = store;

  const isFavMenuSelected =
    selectedMenu.row === 1 && selectedMenu.section === 0;

  const listData = filteredList;
  const searchCategory = isFavMenuSelected
    ? SidebarItem.JAVASCRIPT_FAVORITE
    : SidebarItem.JAVASCRIPT;

  useEffect(() => {
    (async () => {
      getQuestions(SidebarItem.JAVASCRIPT);
    })();
  }, []);

  const onSearch = (value: string) => {
    setValue(value);

    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchQuestion(value, searchCategory);
    }, 300);
  };

  const renderList = () => {
    if (Platform.OS === "web") {
      return (
        <>
          {isLoading && <Loader />}
          <View style={styles.panel}>
            <View
              style={[
                styles.panelLeft,
                {
                  height: `${screenHeight - 90}px`,
                },
              ]}
            >
              <Input
                placeholder="Search"
                size="small"
                value={value}
                onChangeText={onSearch}
              />

              <QuestionList
                listData={listData}
                toggleFavorite={toggleFavorite}
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                selectedMenu={selectedMenu}
              />
            </View>
            <View
              style={[
                styles.panelRight,
                {
                  height: `${screenHeight - 90}px`,
                },
              ]}
            >
              <QuestionDetail selected={selectedQuestion} />
            </View>
          </View>
        </>
      );
    }
    return (
      <>
        {isLoading && <Loader />}
        <Input
          placeholder="Search"
          value={value}
          onChangeText={(nextValue) => setValue(nextValue)}
        />
        <QuestionList
          listData={listData}
          toggleFavorite={toggleFavorite}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
          selectedMenu={selectedMenu}
        />
      </>
    );
  };

  return renderList();
});

const styles = StyleSheet.create({
  panel: {
    display: "flex",
    flexDirection: "row",
  },
  panelLeft: {
    width: `40%`,
    overflow: "scroll",
  },
  panelRight: {
    width: `60%`,
    overflow: "scroll",
    padding: 16,
    paddingRight: 32,
  },
});
