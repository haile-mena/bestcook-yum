import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useColorScheme, Text, Button, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { auth } from "../support/firebase";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { SafeAreaView } from "react-native-safe-area-context";
import WelcomeScreen from "./screens/WelcomeScreen";
import App from ".";
// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  if (!loaded) {
    return null;
  }

  console.log(auth.currentUser);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {user ? (
          <>
            <Stack.Screen name="." component={App} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="screens/WelcomeScreen"
              component={WelcomeScreen}
            />
            <Stack.Screen name="screens/SignUp" component={SignUp} />
            <Stack.Screen name="screens/Login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </SafeAreaView>
  );
}
