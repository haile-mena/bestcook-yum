import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useColorScheme, Text, Button, View } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { auth } from "../support/firebase";
import SignUp from "../screens/signup";
import Login from "../screens/login";
import Home from "../screens/Home";
import { SafeAreaView } from "react-native-safe-area-context";
import WelcomeScreen from "../screens/Welcome";

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
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          {user ? (
            <>
              <Stack.Screen name="Home" component={Home} />
            </>
          ) : (
            <>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Login" component={Login} />
            </>
          )}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
