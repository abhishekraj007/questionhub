import React, { useContext, useState } from "react";
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
import { StoreContext } from "../../App";
import { isItMobile } from "../utils";
import { CloseIcon, Ellipsis, GoogleIcon, HamBurgerIcon } from "./Icons/Icons";

function Header() {
  const { menuStore, authStore } = useContext(StoreContext);

  const { setShowSidebar, showSidebar, theme, setTheme } = menuStore;

  const { user, isLoggedIn, setShowLoginModal } = authStore;
  const [showLoginMenu, setShowLoginMenu] = useState(false);

  const iconColor = {
    fill: theme === AppTheme.DARK ? "#ffffff" : "#222b45",
  };

  const onItemSelect = () => {
    setShowLoginMenu(false);
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

  const renderLoginMenu = () => (
    <TopNavigationAction
      onPress={() => setShowLoginMenu(true)}
      icon={() => Ellipsis(iconColor)}
    />
  );

  const renderOverflowMenu = () => {
    return (
      <OverflowMenu
        anchor={renderLoginMenu}
        visible={showLoginMenu}
        onSelect={onItemSelect}
        onBackdropPress={() => setShowLoginMenu(false)}
      >
        {isLoggedIn && <MenuItem title={user?.displayName} disabled={true} />}

        {isLoggedIn && (
          <MenuItem
            onPress={onLogout}
            title="Logout"
            accessoryLeft={() => GoogleIcon(iconColor)}
          />
        )}

        {!isLoggedIn && (
          <MenuItem
            onPress={onLogin}
            title="Login"
            accessoryLeft={() => GoogleIcon(iconColor)}
          />
        )}
      </OverflowMenu>
    );
  };

  const renderHamburger = () => {
    if (isItMobile) {
      return (
        <TopNavigationAction
          onPress={() => setShowSidebar(!showSidebar)}
          icon={() =>
            showSidebar ? CloseIcon(iconColor) : HamBurgerIcon(iconColor)
          }
          style={{
            marginLeft: 16,
          }}
        />
      );
    }
    return null;
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
            // status="success"
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
      accessoryLeft={renderHamburger}
      accessoryRight={renderRightNav}
    ></TopNavigation>
  );
}

export default observer(Header);
