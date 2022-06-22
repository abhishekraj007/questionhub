import { Divider, List } from "@ui-kitten/components";
import React, { memo } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({
  listData,
  toggleFavorite,
  setSelectedQuestion,
  selectedQuestion,
  selectedMenu,
}) {
  const renderQuestion = ({ item, index }) => {
    return (
      <QuestionItem
        key={item?.id}
        item={item}
        index={index}
        setSlected={setSelectedQuestion}
        selectedItem={selectedQuestion}
        toggleFavorite={toggleFavorite}
        selectedMenu={selectedMenu}
      />
    );
  };

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
