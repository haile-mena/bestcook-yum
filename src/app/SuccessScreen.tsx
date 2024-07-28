import { router } from "expo-router";
import React from "react";
import { Text, Button } from "react-native";
function SuccessScreen() {
  return (
    <>
      <Text> Welcome User</Text>
      <Text>Let's make your planning and feeding smoother with us.</Text>
      <Button
        title="Go to Dashboard"
        onPress={() => {
          router.navigate("./Home");
        }}
      />
    </>
  );
}

export default SuccessScreen;
