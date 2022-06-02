import React, { memo } from "react";
import { useState } from "react";
import { Question } from "../data-contracts";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Text } from "@ui-kitten/components";
import RenderHTML from "react-native-render-html";

interface QuestionItemProps {
  item: Question;
}

const QuestionItem = ({ item }: QuestionItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const { title, content } = item;
  const wrappedContent = `<div>${content}</div>`;
  const { width } = useWindowDimensions();

  return <Text>{item.title}</Text>;
};

const styles = StyleSheet.create({
  accordionItem: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 2,
    marginBottom: 8,
  },
});

export default memo(QuestionItem);
