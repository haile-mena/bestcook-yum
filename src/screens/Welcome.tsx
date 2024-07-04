import React from "react";
import { Button, Text, SafeAreaView } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

type WelcomeScreenProps = {
  navigation: any;
};

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <SafeAreaView>
      <Text>YUM!</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
      <Button title="Log In" onPress={() => navigation.navigate("Login")} />
    </SafeAreaView>
  );
}

//This is justa areference..
