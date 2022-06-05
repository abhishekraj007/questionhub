import { Divider, List } from "@ui-kitten/components";
import React, { memo } from "react";
import { Platform } from "react-native";
import QuestionItem from "./QuestionItem";
import QuestionItemWeb from "./QuestionItemWeb";

function QuestionList({
  listData,
  toggleFavorite,
  setSelectedQuestion,
  selectedQuestion,
  selectedMenu,
}) {
  const renderQuestion = ({ item, index }) => {
    if (Platform.OS === "web") {
      return (
        <QuestionItemWeb
          key={item?.id}
          item={item}
          index={index}
          setSlected={setSelectedQuestion}
          selectedItem={selectedQuestion}
          toggleFavorite={toggleFavorite}
          selectedMenu={selectedMenu}
        />
      );
    }
    return <QuestionItem key={item?.title} item={item} />;
  };

  console.log("Render q list");
  return (
    <List
      data={listData}
      ItemSeparatorComponent={Divider}
      renderItem={renderQuestion}
      style={{
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
      }}
    />
  );
}

export default memo(QuestionList);
