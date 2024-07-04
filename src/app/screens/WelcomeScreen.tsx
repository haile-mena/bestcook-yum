import React from "react";
import { Button, Text, SafeAreaView } from "react-native";
import Login from "./Login";
import SignUp from "./SignUp";
import { router } from "expo-router";

export default function WelcomeScreen() {
  return (
    <SafeAreaView>
      <Text>YUM!</Text>
      <Button title="Sign Up" onPress={() => router.navigate("signUp")} />
      <Button title="Log In" onPress={() => router.navigate("Login")} />
    </SafeAreaView>
  );
}

//This is justa areference..
