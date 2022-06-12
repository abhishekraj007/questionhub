import React, { useState } from "react";
import {
  Button,
  Icon,
  TopNavigation,
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
  Text,
} from "@ui-kitten/components";
import { AppTheme } from "../data-contracts";
import { View } from "react-native";
import { IStore } from "../stores";
import { observer } from "mobx-react-lite";

interface Props {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  store: IStore;
}

function Header({
  theme,
  setTheme,
  store: { authStore, questionStore },
}: Props) {
  const { user, isLoggedIn, setShowLoginModal } = authStore;
  const [visible, setVisible] = useState(false);

  const onItemSelect = () => {
    setVisible(false);
  };

  const onLogin = () => {
    setShowLoginModal(true);
  };

  const onLogout = () => {
    authStore.logout();
  };

  const ToggleIcon = (props) => (
    <Icon {...props} name={theme === AppTheme.LIGHT ? "moon" : "sun"} />
  );

  const Ellipsis = (props) => <Icon {...props} name="more-vertical-outline" />;
  const GoogleIcon = (props) => <Icon {...props} name="google" />;

  const renderToggleButton = () => (
    <Button
      onPress={() => setVisible(true)}
      appearance="ghost"
      size="small"
      accessoryLeft={Ellipsis}
    />
  );

  const renderOverflowMenu = () => {
    return (
      <OverflowMenu
        anchor={renderToggleButton}
        visible={visible}
        onSelect={onItemSelect}
        onBackdropPress={() => setVisible(false)}
      >
        {isLoggedIn && <MenuItem title={user?.displayName} disabled={true} />}

        {isLoggedIn && (
          <MenuItem
            onPress={onLogout}
            title="Logout"
            accessoryLeft={GoogleIcon}
          />
        )}

        {!isLoggedIn && (
          <MenuItem
            onPress={onLogin}
            title="Login"
            accessoryLeft={GoogleIcon}
          />
        )}
      </OverflowMenu>
    );
  };

  const renderRightNav = () => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TopNavigationAction
          onPress={() => {
            setTheme(theme === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT);
          }}
          icon={ToggleIcon}
          style={{
            marginLeft: 16,
          }}
        />
        {!isLoggedIn && (
          <Button
            appearance="outline"
            status="primary"
            accessoryLeft={GoogleIcon}
            onPress={onLogin}
            size="tiny"
            style={{
              marginLeft: 16,
            }}
          >
            Login
          </Button>
        )}
        {isLoggedIn && renderOverflowMenu()}
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
      accessoryRight={renderRightNav}
    ></TopNavigation>
  );
}

export default observer(Header);
