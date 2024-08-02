//npm install react-native-svg
//npm install react-native-svg
import React, { useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Animated } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

export default function About2() { 
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, 
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlePress = () => {
    navigation.navigate('SignUp'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.shapeContainer}>
        <Svg height="100%" width="100%" viewBox="0 0 375 259" style={styles.shape}>
          <Defs>
            <LinearGradient id="grad" x1="375" y1="258.742" x2="-121.545" y2="203.055">
              <Stop offset="0" stopColor="#92A3FD" stopOpacity="1" />
              <Stop offset="1" stopColor="#9DCEFF" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Path
            d="M0 254.043C0 254.043 59.4333 130.437 122.033 130.437C184.633 130.437 228.467 258.742 291.067 258.742C353.667 258.742 346.733 191.957 375 191.957V0H0V254.043Z"
            fill="url(#grad)"
          />
        </Svg>
        <Image source={require('../../assets/images/about4.png')} style={styles.image} />
      </View>
      <View style={styles.content}>
      <Text style={styles.title}>So you can focus on the things that matter.</Text>
        <Text style={styles.description}>
          Use your university ID to sign up today!
        </Text>
      </View>
      <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={handlePress}>
          <Image source={require('../../assets/images/about4button.png')} style={styles.buttonImage} />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  shapeContainer: {
    width: '100%',
    height: height * 0.35, 
    justifyContent: 'flex-start', 
    alignItems: 'center',
  },
  shape: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
  },
  content: {
    alignItems: 'flex-start',
    paddingHorizontal: 40,
    marginTop: height * 0.1, 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 20,
    paddingHorizontal: 0,
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
    color: 'gray',
    paddingHorizontal: 0,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  buttonImage: {
    width: 61,
    height: 61,
    resizeMode: 'contain',
  },
  image: {
    width: width * 1, 
    height: height * 0.7, 
    resizeMode: 'contain',
    position: 'absolute', 
    top: -100,
  },
});
