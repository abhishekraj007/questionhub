import React from "react";
import { StyleSheet, Text } from "react-native";

export default function Loader() {
  return (
    <>
      <Text>Loading...</Text>
    </>
  );
}

const styles = StyleSheet.create({
  skeletonContainer: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
  },
});
