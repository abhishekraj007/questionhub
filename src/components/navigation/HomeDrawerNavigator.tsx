import {
  Avatar,
  Drawer,
  DrawerItem,
  IndexPath,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../../screens/Dashboard";
import { IStore } from "../../stores";

const { Navigator, Screen } = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <SafeAreaView>
      <Drawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
      >
        <DrawerItem title="Home" />
      </Drawer>
    </SafeAreaView>
  );
};

interface Props {
  store: IStore;
}

export const HomeDrawerNavigator = ({ store }: Props) => (
  <Navigator drawerContent={(props) => <DrawerContent {...props} />}>
    <Screen name="Home" component={() => <Home store={store} />} />
  </Navigator>
);

const themedStyles = StyleService.create({
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    marginHorizontal: 16,
  },

  icon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
});
