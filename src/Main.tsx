import React, { useContext } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Dashboard } from "./screens/Dashboard";
import { StoreContext } from "../App";
import { AppTheme } from "./data-contracts/contracts";
import { observer } from "mobx-react-lite";

function Main() {
  const {
    menuStore: { theme },
  } = useContext(StoreContext);

  return (
    <ApplicationProvider
      {...eva}
      theme={theme === AppTheme.LIGHT ? eva.light : eva.dark}
    >
      <SafeAreaProvider>
        <Dashboard />
      </SafeAreaProvider>
    </ApplicationProvider>
  );
}

export default observer(Main);
