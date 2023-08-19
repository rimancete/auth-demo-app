import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getDemoMessage } from "../util/request";
import { useAuth } from "../hooks/useAuth/useAuth";

function WelcomeScreen() {
  const { user } = useAuth();
  const [fetchedMessage, setFetchedMessage] = useState();

  const getMessage = useCallback(async () => {
    const message = await getDemoMessage(user.idToken);
    setFetchedMessage(message);
  }, [user]);

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
