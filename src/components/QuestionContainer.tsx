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

interface Props {
  store: IStore;
}

export const QuestionContainer = observer(({ store }: Props) => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();
  const { height: screenHeight } = useWindowDimensions();

  const [value, setValue] = useState("");

  console.log("render q container");

  const {
    menuStore: { selectedMenu },
    questionStore: {
      isLoading,
      javasctipt,
      javasctiptFavorites,
      getQuestions,
      toggleFavorite,
    },
  } = store;

  const isFavMenuSelected =
    selectedMenu.row === 1 && selectedMenu.section === 0;

  const listData = isFavMenuSelected ? javasctiptFavorites : javasctipt;

  const onFavPress = (item: Question) => {
    toggleFavorite(item);
  };

  useEffect(() => {
    (async () => {
      getQuestions(SidebarItem.JAVASCRIPT);
      console.log(javasctipt);
    })();
  }, []);

  const renderQuestion = ({ item, index }) => {
    if (Platform.OS === "web") {
      return (
        <QuestionItemWeb
          key={item.title}
          item={item}
          index={index}
          setSlected={setSelectedQuestion}
          onFavPress={onFavPress}
        />
      );
    }
    return <QuestionItem key={item.title} item={item} />;
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
              {/* <Input
                placeholder="Search"
                value={value}
                onChangeText={(nextValue) => setValue(nextValue)}
              /> */}
              <List
                data={listData}
                ItemSeparatorComponent={Divider}
                renderItem={renderQuestion}
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
        <List
          data={listData}
          ItemSeparatorComponent={Divider}
          renderItem={renderQuestion}
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
    // borderColor: "rgba(0,0,0,0.1)",
    padding: 16,
    paddingRight: 32,
    // borderLeftWidth: 1,
  },
});
