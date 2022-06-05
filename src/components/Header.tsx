import React, { useState } from "react";
import {
  Icon,
  Input,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { AppTheme } from "../data-contracts";
import { useWindowDimensions, View } from "react-native";

interface Props {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
}

function Header({ theme, setTheme }: Props) {
  const [value, setValue] = useState("");
  const { width } = useWindowDimensions();

  const ToggleIcon = (props) => (
    <Icon {...props} name={theme === AppTheme.LIGHT ? "moon" : "sun"} />
  );

  const SearchBar = () => (
    <View
      style={{
        width: width - 440,
        maxWidth: 600,
        marginRight: width / 8,
      }}
    >
      <Input
        placeholder="Search"
        value={value}
        onChangeText={(nextValue) => setValue(nextValue)}
      />
    </View>
  );

  const renderRightNav = () => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          // width: "80%",
        }}
      >
        {/* <SearchBar /> */}
        <TopNavigationAction
          onPress={() => {
            setTheme(theme === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT);
          }}
          icon={ToggleIcon}
        />
      </View>
    );
  };

  return (
    <TopNavigation
      style={{
        paddingLeft: 16,
        paddingRight: 16,
      }}
      title={"Interview Questions"}
      // accessoryLeft={SearchBar}
      accessoryRight={renderRightNav}
    ></TopNavigation>
  );
}

export default Header;
