import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "tamagui";
import { Stack } from "expo-router";

const App = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Home" }} />
      <Text> Welcome peeps</Text>
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

export default App;
