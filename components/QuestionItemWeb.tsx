import React, { memo } from "react";
import { useState } from "react";
import { Question } from "../data-contracts";
import {
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
  Text,
} from "react-native";
import { ListItem } from "@ui-kitten/components";

interface QuestionItemWebProps {
  item: Question;
  index: number;
  setSlected: (item: Question) => void;
}

const QuestionItemWeb = ({ item, setSlected, index }: QuestionItemWebProps) => {
  const onItemClick = () => {
    setSlected(item);
  };

  return (
    <ListItem title={`${index + 1}. ${item?.title}`} onPress={onItemClick} />
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    padding: 8,
  },
  item: {
    // borderWidth: 1,
    // borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 2,
    marginBottom: 8,
  },
});

export default memo(QuestionItemWeb);
