import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeDrawerNavigator } from "./HomeDrawerNavigator";
import { IStore } from "../../stores";
import Home from "../../screens/Dashboard";
import { SafeAreaView } from "react-native-safe-area-context";
import { Drawer, DrawerItem, IndexPath } from "@ui-kitten/components";

const { Navigator, Screen } = createDrawerNavigator();

interface Props {
  store: IStore;
}

const DrawerContent = ({ navigation, state }) => {
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

export const AppNavigator = ({ store }: Props) => (
  <NavigationContainer>
    <Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Screen name="Home" component={Home} />
    </Navigator>
  </NavigationContainer>
);
