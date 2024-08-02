//npm install react-native-svg
import React, { useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Animated } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

export default function About1() { 
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000, // 2 seconds fade-in
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlePress = () => {
    navigation.navigate('About2');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.shapeContainer}>
        <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height * 0.5}`} style={styles.shape}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#92A3FD" stopOpacity="1" />
              <Stop offset="1" stopColor="#9DCEFF" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Path
            d={`M0,0 L0,${height * 0.4} C${width * 0.25},${height * 0.5} ${width * 0.75},${height * 0.3} ${width},${height * 0.4} L${width},0 Z`}
            fill="url(#grad)"
          />
        </Svg>
        <Image source={require('../../assets/images/about1.png')} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Personalized Recipes</Text>
        <Text style={styles.description}>
          Scan your groceries, get recipe suggestions, and manage your digital fridge effortlessly.
        </Text>
      </View>
      <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={handlePress}>
          <Image source={require('../../assets/images/about1button.png')} style={styles.buttonImage} />
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
    height: height * 0.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  shape: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    width: width * 1.2, 
    height: height * 0.9, 
    resizeMode: 'contain',
    marginVertical: -170,
    position: 'absolute', 
    top: 0,  
  },
  content: {
    alignItems: 'flex-start',
    paddingHorizontal: 40,
    marginTop: -50,
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
});
