import React from "react";
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { AppTheme } from "../data-contracts";

interface Props {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
}

function Header({ theme, setTheme }: Props) {
  const ToggleIcon = (props) => (
    <Icon {...props} name={theme === AppTheme.LIGHT ? "moon" : "sun"} />
  );

  const renderToggleTheme = () => {
    return (
      <TopNavigationAction
        onPress={() => {
          setTheme(theme === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT);
        }}
        icon={ToggleIcon}
      />
    );
  };

  return (
    <TopNavigation
      style={{
        paddingLeft: 16,
        paddingRight: 16,
      }}
      title={"Interview Questions"}
      accessoryRight={renderToggleTheme}
    />
  );
}

export default Header;
