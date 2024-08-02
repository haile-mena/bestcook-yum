//npm install react-native-svg
//npm install react-native-svg
//npm install react-native-svg
//npm install react-native-svg
import React, { useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Animated } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

export default function About3() { 
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
    navigation.navigate('About4'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.shapeContainer}>
        <Svg height="99%" width={width} viewBox={`0 50 ${width} 400`} style={styles.shape}>
          <Defs>
            <LinearGradient id="grad" x1="375" y1="459" x2="-125.603" y2="405.91" gradientUnits="userSpaceOnUse">
              <Stop offset="0" stopColor="#92A3FD" stopOpacity="1" />
              <Stop offset="1" stopColor="#9DCEFF" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <Path
            d={`M0 210.102C0 210.102 22.4 213.641 45.1 295.939C67.8 378.236 130.8 439 ${width / 1.9} 439C${width} 439 ${width} 324.517 ${width} 250.065V0H0V210.102Z`}
            fill="url(#grad)"
          />
        </Svg>
        <Image source={require('../../assets/images/about3.png')} style={styles.image} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Easy grocery and pickup delivery</Text>
        <Text style={styles.description}>
          Get notified about local store deals, see what's nearby, and have groceries delivered while you're in class.
        </Text>
      </View>
      <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={handlePress}>
          <Image source={require('../../assets/images/about3button.png')} style={styles.buttonImage} />
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
    height: height * 0.45, 
    justifyContent: 'flex-start', 
    alignItems: 'center',
  },
  shape: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  content: {
    alignItems: 'flex-start',
    paddingHorizontal: 40,
    marginTop: height * 0, 
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
    height: height * 0.6,
    resizeMode: 'contain',
    position: 'absolute',
    top: -100,
  },
});
