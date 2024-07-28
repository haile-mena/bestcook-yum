import React from "react";
import { Button, Text, SafeAreaView, Image } from "react-native";
import { router } from "expo-router";
export default function BeginScreen() {
  return (
    <SafeAreaView>
      <Text>yumly</Text>
      <Text>Eat Smart, study hard</Text>
      <Image />
      <Button
        title=" Get Started"
        onPress={() => router.navigate("./WelcomeScreen")}
      />
    </SafeAreaView>
  );
}

//This is justa areference..
