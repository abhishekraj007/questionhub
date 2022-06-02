import React, { memo, useEffect, useState } from "react";
import { View, StyleSheet, Platform, useWindowDimensions } from "react-native";
import { Question } from "../data-contracts";
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
  const { height: screenHeight } = useWindowDimensions();

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
                data={data}
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
          data={data}
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
