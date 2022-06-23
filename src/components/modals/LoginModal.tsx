import React, { useContext, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { Button, Card, Icon, Spinner, Text } from "@ui-kitten/components";
import { apiAddUser, apiGetUserData, apiLogInWithGoogle } from "../../apis";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../../App";
import { CloseIcon, GoogleIcon, LoadingIndicator } from "../Icons/Icons";

const LoginModal = () => {
  const { authStore, menuStore, questionStore } = useContext(StoreContext);

  const { setUser, setIsLoggedIn, showLoginModal, setShowLoginModal } =
    authStore;
  const { width } = useWindowDimensions();
  const [isMakingCall, setIsMakingCall] = useState(false);

  const onLogin = async () => {
    try {
      setIsMakingCall(true);
      // Authenticate using Google
      const res = await apiLogInWithGoogle();
      const newUser = {
        id: res.user.uid,
        displayName: res.user.displayName,
        email: res.user.email,
      };

      // Update state
      setUser(newUser);
      setIsLoggedIn(true);

      const userSnap = await apiGetUserData(newUser.id);

      // Check if this user exist
      if (userSnap.exists()) {
        // TODO: Can we use to reload page
        // setUserFavs(userSnap?.data()?.favs, getCategory(selectedMenu));
        window.location.reload();
      } else {
        // Add this user to database
        await apiAddUser(newUser);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsMakingCall(false);
      setShowLoginModal(false);
    }
  };

  const Header = (props) => (
    <View
      {...props}
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingLeft: 24,
        alignItems: "center",
      }}
    >
      <Text category="h6">Login</Text>
      <Button
        onPress={() => setShowLoginModal(false)}
        size="large"
        appearance="ghost"
        accessoryLeft={CloseIcon}
      />
    </View>
  );

  if (!showLoginModal) {
    return <View />;
  }

  return (
    <View
      style={{
        minHeight: 220,
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          maxWidth: width,
          width: 420,
        }}
        disabled={true}
        header={Header}
      >
        <View
          style={{
            paddingTop: 32,
            paddingBottom: 32,
          }}
        >
          <Button
            disabled={isMakingCall}
            size="giant"
            accessoryLeft={isMakingCall ? LoadingIndicator : GoogleIcon}
            onPress={onLogin}
          >
            Login with Google
          </Button>
        </View>
      </Card>
    </View>
  );
};

export default observer(LoginModal);
