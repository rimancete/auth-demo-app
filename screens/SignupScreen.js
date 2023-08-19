import { useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../util/authRequest";
import { useAuth } from "../hooks/useAuth/useAuth";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { updateUser } = useAuth();

  const signupHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      const userData = await createUser(email, password);

      await AsyncStorage.setItem("token", userData.idToken);
      updateUser(userData);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user. Please check your input or try again later"
      );
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) return <LoadingOverlay message="Creating user..." />;
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
