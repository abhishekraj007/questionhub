import { Spinner } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

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
    paddingRight: 200,
    paddingBottom: 100,
  },
});
