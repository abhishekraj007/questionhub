import React, { memo, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Platform,
  Text,
  useWindowDimensions,
} from "react-native";
import { Question, SidebarItem } from "../data-contracts";
import QuestionItem from "./QuestionItem";
import QuestionItemWeb from "./QuestionItemWeb";
import Loader from "./Loader";
import { Divider, IndexPath, List } from "@ui-kitten/components";
import QuestionDetail from "./QuestionDetail";

interface Props {
  selectedMenu: IndexPath;
}

const JS_URL =
  "https://raw.githubusercontent.com/abhishekraj007/md2json/main/js-v2.json";

export const QuestionContainer = memo(({ selectedMenu }: Props) => {
  const [data, setData] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();
  const [isLoading, setIsLoading] = useState(false);
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  console.log(selectedMenu);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch(JS_URL);
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    <Loader />;
  }

  const renderQuestion = ({ item, index }) => {
    if (Platform.OS === "web") {
      return (
        <QuestionItemWeb
          key={item.title}
          item={item}
          index={index}
          setSlected={setSelectedQuestion}
        />
      );
    }
    return <QuestionItem key={item.title} item={item} />;
  };

  const renderList = () => {
    if (Platform.OS === "web") {
      return (
        <View style={styles.gridTwo}>
          <View
            style={{
              width: `40%`,
              height: `${screenHeight - 48}px`,
              overflow: "scroll",
            }}
          >
            <List
              data={data}
              ItemSeparatorComponent={Divider}
              renderItem={renderQuestion}
            />
          </View>
          <View
            style={{
              width: `60%`,
              height: `${screenHeight - 48}px`,
              overflow: "scroll",
              borderColor: "rgba(0,0,0,0.1)",
              padding: 16,
              borderLeftWidth: 1,
            }}
          >
            <QuestionDetail selected={selectedQuestion} />
          </View>
        </View>
      );
    }
    return (
      <List
        data={data}
        ItemSeparatorComponent={Divider}
        renderItem={renderQuestion}
      />
    );
  };

  return renderList();
});

const styles = StyleSheet.create({
  gridTwo: {
    display: "flex",
    flexDirection: "row",
  },
  webPanel: {},
  panelLeft: {
    width: "320px",
  },
  panelRight: {
    backgroundColor: "red",
  },
});
