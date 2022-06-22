import { Spinner } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { isItMobile } from "../utils";

export default function Loader() {
  const { height: screenHeight } = useWindowDimensions();
  return (
    <View
      style={[
        styles.loaderContainer,
        {
          height: `${screenHeight - 90}px`,
        },
      ]}
    >
      <Spinner size="giant" />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: `${isItMobile ? "0" : "200"}px`,
    paddingBottom: `${isItMobile ? "0" : "100"}px`,
  },
});
