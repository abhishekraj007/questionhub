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
import { AppTheme } from "../data-contracts/contracts";
import { View } from "react-native";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../App";
import { isItMobile } from "../utils";
import {
  CloseIcon,
  Ellipsis,
  GoogleIcon,
  HamBurgerIcon,
  iconColor,
  NoteIcon,
} from "./Icons/Icons";

function Header() {
  const { menuStore, authStore, notesStore } = useContext(StoreContext);

  const { setShowSidebar, showSidebar, theme, setTheme } = menuStore;
  const { user, isLoggedIn, setShowLoginModal } = authStore;
  const { setShowNoteModal } = notesStore;

  const [showLoginMenu, setShowLoginMenu] = useState(false);

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
      icon={() => Ellipsis(iconColor(theme))}
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
            accessoryLeft={() => GoogleIcon(iconColor(theme))}
          />
        )}

        {!isLoggedIn && (
          <MenuItem
            onPress={onLogin}
            title="Login"
            accessoryLeft={() => GoogleIcon(iconColor(theme))}
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
            showSidebar
              ? CloseIcon({
                  ...iconColor(theme),
                  style: { width: 28, height: 28 },
                })
              : HamBurgerIcon(iconColor(theme))
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
        {isLoggedIn && !isItMobile && (
          <Button
            appearance="outline"
            status="primary"
            onPress={() => setShowNoteModal(true)}
            size="small"
            style={{
              marginLeft: 16,
            }}
            accessoryLeft={NoteIcon}
          >
            Create Note
          </Button>
        )}
        {isLoggedIn && isItMobile && (
          <TopNavigationAction
            onPress={() => setShowNoteModal(true)}
            icon={NoteIcon}
            style={{
              marginLeft: 16,
            }}
          />
        )}
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
