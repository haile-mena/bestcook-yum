import React from "react";
import { Button, Text, SafeAreaView } from "react-native";
import { router } from "expo-router";

export default function WelcomeScreen() {
  return (
    <SafeAreaView>
      <Text>Personalized Recipes</Text>
      <Text>Scan your grociereis and manage your fridge effortlessly.</Text>
      {/* adjust to look lue=je the rest of the onboarding page */}
      <Button title="Sign Up" onPress={() => router.navigate("./SignUp")} />
      <Button title="Log In" onPress={() => router.navigate("./Login")} />
    </SafeAreaView>
  );
}

//This is justa areference..
