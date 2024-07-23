import React from "react";
import { Button, Text, SafeAreaView, Image } from "react-native";
import { router } from "expo-router";
export default function BeginScreen() {
  return (
    <SafeAreaView>
      <Text>Your feeding Companion for your better and healthy eating.</Text>
      <Image />
      <Button
        title=" Let's Start"
        onPress={() => router.navigate("./WelcomeScreen")}
      />
    </SafeAreaView>
  );
}

//This is justa areference..
