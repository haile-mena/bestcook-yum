import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useColorScheme } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { auth, db } from "../support/firebase";
import SignUp from "./SignUp";
import Login from "./Login";
import SuccessScreen from "./SuccessScreen";
import BeginScreen from "./BeginScreen";
import Home from "./Home";
import Allergies from "./Allergies";
import Menu from "./Menu";
import { SafeAreaView } from "react-native-safe-area-context";
import WelcomeScreen from "./WelcomeScreen";
import { doc, getDoc } from "firebase/firestore";
import Notifications from "./Notifications";

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [user, setUser] = useState(auth.currentUser);
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        checkIfFirstTime(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  const checkIfFirstTime = async (uid: string) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      setIsFirstTime(!userData.allergiesCompleted);
    } else {
      setIsFirstTime(true);
    }
  };

  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {user ? (
          <>
            {isFirstTime ? (
              <>
                <Stack.Screen
                  name="Allergies"
                  component={Allergies}
                  options={{ title: "Allergies" }}
                />
                <Stack.Screen
                  name="SuccessScreen"
                  component={SuccessScreen}
                  options={{ title: "Success" }}
                />
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{ title: "Home" }}
                />
                <Stack.Screen
                  name="Notifications"
                  component={Notifications}
                  options={{ title: "Notifications" }}
                />

                <Stack.Screen
                  name="Menu"
                  component={Menu}
                  options={{ title: "Menu" }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{ title: "yumly" }}
                />
                <Stack.Screen
                  name="Notifications"
                  component={Notifications}
                  options={{ title: "Notifications" }}
                />
                <Stack.Screen
                  name="Menu"
                  component={Menu}
                  options={{ title: "Menu" }}
                />
              </>
            )}
          </>
        ) : (
          <>
            <Stack.Screen
              name="BeginScreen"
              component={BeginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
              options={{ title: "Welcome" }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ title: "Sign Up" }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "Login" }}
            />
          </>
        )}
      </Stack.Navigator>
    </SafeAreaView>
  );
}
