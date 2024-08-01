// index.tsx
import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Home";
import Swipe from "./Swipe";
import QRScanner from "./QRScanner";
import Fridge from "./Fridge";
import Account from "./Account";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case "Home":
                iconName = "home";
                break;
              case "Swipe":
                iconName = "swap-horizontal";
                break;
              case "QR Scanner":
                iconName = "qr-code";
                break;
              case "Fridge":
                iconName = "fast-food";
                break;
              case "Account":
                iconName = "person";
                break;
              default:
                iconName = "help-circle";
                break;
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerShown: false, // This hides the header on each tab screen
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Swipe" component={Swipe} />
        <Tab.Screen name="QR Scanner" component={QRScanner} />
        <Tab.Screen name="Fridge" component={Fridge} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
