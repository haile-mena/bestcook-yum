import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

type Props = {
  navigation: any; // Type for navigation prop
};

const Signup: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Signup Screen</Text>
      <Button title="Login" onPress={navigation.navigate("Home")} />
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

export default Signup;
