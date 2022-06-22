import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const isItMobile = width < 769;
