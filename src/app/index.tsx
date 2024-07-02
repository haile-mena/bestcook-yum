import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "tamagui";
import { Stack } from "expo-router";

const App = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Home" }} />
      <ScrollView flex={1}>
        <Text> Welcome</Text>
      </ScrollView>
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
