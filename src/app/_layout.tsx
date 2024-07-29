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
import { SafeAreaView } from "react-native-safe-area-context";
import WelcomeScreen from "./WelcomeScreen";
import { doc, getDoc } from "firebase/firestore";
// Prevent the splash screen from auto-hiding before asset loading is complete
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
        // Check if it's the user's first time
        checkIfFirstTime(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  const checkIfFirstTime = async (uid: string) => {
    // Here you would typically query your database to check if the user has completed the Allergies step
    // For example, you might have a field in your users collection that tracks this
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

  console.log(auth.currentUser);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {user ? (
          <>
            {isFirstTime ? (
              <>
                <Stack.Screen name="Allergies" component={Allergies} />
                <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
                <Stack.Screen name="Home" component={Home} />
              </>
            ) : (
              <Stack.Screen name="Home" component={Home} />
            )}
          </>
        ) : (
          <>
            <Stack.Screen name="BeginScreen" component={BeginScreen} />
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </SafeAreaView>
  );
}
