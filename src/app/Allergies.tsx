import React from "react";
import { Text, Button } from "react-native";
import { router } from "expo-router";
const Allergies = () => {
  return (
    <>
      <Text>Allergies and Diet</Text>
      <Button title="Done" onPress={() => router.navigate("./SuccessScreen")} />
    </>
  );
};
export default Allergies;
