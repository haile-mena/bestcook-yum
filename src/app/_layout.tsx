import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { auth } from "../support/firebase";
import SignUp from "../screens/signup";
import { SafeAreaView } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  console.log(auth.currentUser);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView>
        {/* <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
        <Stack.Screen name="not-found" />
        </Stack> */}
        <SignUp />
      </SafeAreaView>
    </ThemeProvider>
  );
}
