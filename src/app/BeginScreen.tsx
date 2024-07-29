//install package - expo install expo-linear-gradient 
import React, { useState, useEffect, useRef } from "react";
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'; //install locally
import { router } from "expo-router";

export default function BeginScreen() {
  const [showButton, setShowButton] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // fade-in animation
        useNativeDriver: true,
      }).start();
    }, 2000); //may adjust seconds until get started button appears, ask group for feedback

    return () => clearTimeout(timer); 
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>yumly</Text>
        <Text style={styles.subtitle}>Eat Smart, Study Hard</Text>
      </View>
      <View style={styles.flexSpacer} />
      {showButton && (
        <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
          <TouchableOpacity onPress={() => router.navigate("./WelcomeScreen")}>
            <LinearGradient
              colors={['#9DCEFF','#92A3FD']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: '50%', //to adjust title and subtitle, ask feedback may be unbalanced
  },
  flexSpacer: {
    flex: 1, 
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#7e89e6',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 50,
  },
  button: {
    paddingVertical: 25,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

//This is justa areference..