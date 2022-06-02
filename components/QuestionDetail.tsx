import React, { memo } from "react";
import { useWindowDimensions, StyleSheet, View } from "react-native";
import RenderHTML from "react-native-render-html";
import { Layout, styled, useTheme, Text } from "@ui-kitten/components";
import { Question } from "../data-contracts";

interface QuestionDetailProps {
  selected: Question | undefined;
}

const QuestionDetail = ({ selected }: QuestionDetailProps) => {
  const theme = useTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  console.log(theme);

  if (selected) {
    return (
      <RenderHTML
        contentWidth={screenWidth / 2}
        source={{
          html: `${selected?.content}`,
        }}
        tagsStyles={{
          body: {
            color: theme["text-basic-color"],
          },
        }}
      />
    );
  }

  return (
    <View
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: [
          {
            translateX: -60,
            translateY: -20,
          },
        ],
      }}
    >
      <Text>Select a Question</Text>
    </View>
  );
};

export default memo(QuestionDetail);
