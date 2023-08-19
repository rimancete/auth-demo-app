import { useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuth } from "../hooks/useAuth/useAuth";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/authRequest";

function LoginScreen() {
  const { updateUser } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const userData = await login(email, password);

      await AsyncStorage.setItem("token", userData.idToken);
      updateUser(userData);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not log you in. Please check your credentials or try again later"
      );
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) return <LoadingOverlay message="Logging you in..." />;

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
