import React, { memo } from "react";
import { useWindowDimensions, View } from "react-native";
import RenderHTML from "react-native-render-html";
import { useTheme, Text } from "@ui-kitten/components";
import { Question } from "../data-contracts";
import { Editor } from "./Editor";
import { isItMobile } from "../utils";

interface QuestionDetailProps {
  selected: Question | undefined;
}

const QuestionDetail = ({ selected }: QuestionDetailProps) => {
  const theme = useTheme();
  const { width: screenWidth } = useWindowDimensions();
  const content = selected?.content?.join("");

  if (selected) {
    return (
      <RenderHTML
        contentWidth={screenWidth / 2}
        source={{
          html: content,
        }}
        baseStyle={{
          fontSize: isItMobile ? 14 : 18,
          letterSpacing: 1,
          lineHeight: 24,
        }}
        tagsStyles={{
          body: {
            color: theme["text-basic-color"],
            padding: 16,
          },
          img: {
            maxWidth: "100",
          },
          pre: {
            backgroundColor: theme["color-basic-transparent-200"],
            padding: 16,
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
      {/* <Editor /> */}
      <Text>Select a Question</Text>
    </View>
  );
};

export default memo(QuestionDetail);
