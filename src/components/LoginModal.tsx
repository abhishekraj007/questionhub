import React, { useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import {
  Button,
  Card,
  Icon,
  Modal,
  Spinner,
  Text,
} from "@ui-kitten/components";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../firebase-config";
import {
  apiAddUser,
  apiGetUserData,
  apiLogInWithGoogle,
  apiUpdateUser,
} from "../apis";
import { IStore } from "../stores";
import { observer } from "mobx-react-lite";
import { getCategory } from "../data-contracts";

interface Props {
  store: IStore;
}

const LoginModal = ({
  store: { menuStore, authStore, questionStore },
}: Props) => {
  const {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    showLoginModal,
    setShowLoginModal,
  } = authStore;
  const { setUserFavs } = questionStore;
  const { selectedMenu } = menuStore;
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
        setUserFavs(userSnap?.data()?.favs, getCategory(selectedMenu));
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

  const LoadingIndicator = (props) => (
    <View>
      <Spinner size="small" />
    </View>
  );

  const GoogleIcon = (props) => <Icon {...props} name="google" />;
  const CloseIcon = (props) => <Icon {...props} name="close" />;

  const Header = (props) => (
    <View
      {...props}
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 24,
        paddingRight: 24,
        alignItems: "center",
      }}
    >
      <Text category="h5">Login</Text>
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
