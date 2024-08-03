import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Svg, { Rect } from 'react-native-svg';

const { width } = Dimensions.get('window');

const Fridge = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fridge</Text>
      <View style={styles.reminderContainer}>
        <Svg width={width - 40} height="80" viewBox={`0 0 ${width - 40} 80`} fill="none" style={styles.reminderSvg}>
          <Rect opacity="0.1" width={width - 40} height="80" rx="20" fill="#FF0000" />
        </Svg>
        <Image source={require('../../assets/images/reminderimage.png')} style={styles.reminderImage} />
        <View style={styles.reminderTextContainer}>
          <Text style={styles.reminderText}>Reminder!</Text>
          <Text style={styles.reminderDetailText}>Heirloom Tomatoes expiring in 3 days.</Text>
          <Text style={styles.reminderSubText}>View recipes using tomatoes.</Text>
        </View>
        <TouchableOpacity style={styles.closeButton}>
          <Image source={require('../../assets/images/x-icon.png')} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.currentItemsText}>Current Items In Fridge</Text>
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => router.navigate("./Home")}>
          <Image source={require('../../assets/images/Home.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.navigate("./Swipe")}>
          <Image source={require('../../assets/images/Activity.png')} style={[styles.icon, { marginRight: 50 }]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.navigate("./Fridge")} style={styles.circleButton}>
          <Image source={require('../../assets/images/Scan.png')} style={styles.scanIcon} />
        </TouchableOpacity>
        <Image source={require('../../assets/images/Buy.png')} style={[styles.icon, { marginLeft: 50 }]} />
        <Image source={require('../../assets/images/Profile.png')} style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 30,
  },
  title: {
    marginTop: -10,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10, // Adjust margin to move the title higher
  },
  reminderContainer: {
    position: 'relative',
    width: width - 40,
    marginBottom: 30, // Adjust margin to create more space
  },
  reminderSvg: {
    position: 'absolute',
  },
  reminderImage: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 50,
    height: 50,
  },
  reminderTextContainer: {
    position: 'absolute',
    top: 15,
    left: 80,
  },
  reminderText: {
    fontSize: 14,
    color: '#FF0000',
  },
  reminderDetailText: {
    fontSize: 12,
    color: '#000',
  },
   reminderSubText: {
    fontSize: 12,
    color: '#7D7D7D',
    marginTop: 8, 
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  currentItemsText: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 70, // Adding more margin to separate from the reminder
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  circleButton: {
    position: 'absolute',
    top: -35, 
    left: width / 2 - 35, 
    width: 70,
    height: 70, 
    borderRadius: 35, 
    backgroundColor: '#92A3FD',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  scanIcon: {
    width: 25,
    height: 25,
  },
});

export default Fridge;
