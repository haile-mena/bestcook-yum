// Welcome.tsx

import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

type Props = {
  navigation: any; // Type for navigation prop
};

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const goToLogin = () => {
    navigation.navigate("Login"); // Navigate to Login screen
  };

  const goToSignUp = () => {
    navigation.navigate("Signup"); // Navigate to SignUp screen
  };

  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Button title="Login" onPress={goToLogin} />
      <Button title="Sign Up" onPress={goToSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WelcomeScreen;
//modif, this is just for setup, modify to liking.
