import React from "react";
import { Button, Text, SafeAreaView } from "react-native";
import { router } from "expo-router";

export default function WelcomeScreen() {
  return (
    <SafeAreaView>
      <Text>Personalized Recipes</Text>
      <Button title="Sign Up" onPress={() => router.navigate("./SignUp")} />
      <Button title="Log In" onPress={() => router.navigate("./Login")} />
    </SafeAreaView>
  );
}

//This is justa areference..
