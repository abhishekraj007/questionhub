import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Button, Card, Icon, Modal, Text } from "@ui-kitten/components";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../firebase-config";
import { apiAddUser, apiLogInWithGoogle, apiUpdateUser } from "../apis";
import { IStore } from "../stores";
import { observer } from "mobx-react-lite";

interface Props {
  store: IStore;
}

const LoginModal = ({ store: { authStore } }: Props) => {
  const {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    showLoginModal,
    setShowLoginModal,
  } = authStore;

  const { width } = useWindowDimensions();

  const onLogin = async () => {
    try {
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

      // Get This user from databse
      const userRef = doc(db, "users", newUser.id);
      const userSnap = await getDoc(userRef);

      // Check if this user exist
      if (userSnap.exists()) {
        console.log("user data -< ", userSnap.data());
      } else {
        // Add this user to database
        console.log("adding user");
        await apiAddUser(newUser);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoginModal(false);
    }
  };

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
          <Button size="giant" accessoryLeft={GoogleIcon} onPress={onLogin}>
            Login with Google
          </Button>
        </View>
      </Card>
    </View>
  );
};

export default observer(LoginModal);
