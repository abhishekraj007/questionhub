import React, { useEffect, useState } from "react";
import { View, StyleSheet, Platform, useWindowDimensions } from "react-native";
import QuestionItem from "./QuestionItem";
import QuestionItemWeb from "./QuestionItemWeb";
import Loader from "./Loader";
import { Divider, List } from "@ui-kitten/components";
import QuestionDetail from "./QuestionDetail";
import { Question } from "../data-contracts";
import { getJSQuestions } from "../apis";
import { observer } from "mobx-react-lite";
import { IStore } from "../stores";

interface Props {
  store: IStore;
}

export const QuestionContainer = observer(({ store }: Props) => {
  const [rawData, setRawData] = useState<Question[]>([]);
  const [favoritesData, setFavorites] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();
  const [isLoading, setIsLoading] = useState(false);
  const { height: screenHeight } = useWindowDimensions();

  const {
    menuStore: { selectedMenu },
  } = store;

  const isFavMenuSelected =
    selectedMenu.row === 0 && selectedMenu.section === 0;

  const listData = isFavMenuSelected ? favoritesData : rawData;

  const onFavPress = (item: Question) => {
    const nonFavData = rawData.filter((question) => question.id !== item.id);
    setRawData([item, ...nonFavData]);
    setFavorites([...favoritesData, item]);
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getJSQuestions();
        setRawData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
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
    borderColor: "rgba(0,0,0,0.1)",
    padding: 16,
    paddingRight: 32,
    borderLeftWidth: 1,
  },
});
