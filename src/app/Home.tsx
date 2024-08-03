import { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, Linking } from "react-native";
import { auth, db } from "../support/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from "expo-router";
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

function Home() {
  const [firstName, setFirstname] = useState<string | null>(null);
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [firstTime, setIsFirstTime] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const userDoc = doc(db, "users", userId);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFirstname(userData.firstName || "User");
          setIsFirstTime(userData.allergiesCompleted);
        } else {
          console.log("No such document!");
        }
        setLoading(false);
      } else {
        // If no user is logged in, we can redirect to login page
        router.navigate("/Login");
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const getDiscounts = async () => {
      try {
        const discountRef = collection(db, "Discounts");
        const docSnapshot = await getDocs(discountRef);
        const Discounts = docSnapshot.docs;
        const discountList = Discounts.map((discount) => discount.data());
        setDiscounts(discountList);
      } catch (error) {
        console.error("Error fetching discounts: ", error);
      }
    };
    getDiscounts();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  let message = firstTime ? "Welcome back" : "Welcome";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome Back,</Text>
            <Text style={styles.userNameText}>{firstName}</Text>
          </View>
          <TouchableOpacity onPress={() => router.navigate("./Notifications")}>
            <Image source={require('../../assets/images/Notification-Icon.png')} style={styles.notificationIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.reminderContainer}>
          <Svg width={width - 40} height="100" viewBox={`0 0 ${width - 40} 100`} fill="none" style={styles.reminderSvg}>
            <Rect opacity="0.1" width={width - 40} height="100" rx="20" fill="#FF0000" />
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
        <View style={styles.blueContainer}>
          <Svg width={width - 40} height="137" viewBox={`0 0 ${width - 40} 137`} fill="none" style={styles.blueSvg}>
            <Defs>
              <LinearGradient id="paint0_linear_177_1042" x1="315" y1="137" x2="-94.3845" y2="64.1624" gradientUnits="userSpaceOnUse">
                <Stop stopColor="#92A3FD"/>
                <Stop offset="1" stopColor="#9DCEFF"/>
              </LinearGradient>
            </Defs>
            <Rect opacity="0.2" width={width - 40} height="137" rx="22" fill="url(#paint0_linear_177_1042)"/>
          </Svg>
          <Image source={require('../../assets/images/unireminder.png')} style={styles.uniReminderImage} resizeMode="contain" />
          <View style={styles.uniReminderTextContainer}>
            <Text style={styles.uniReminderTextHeader}>Message from NYU:</Text>
            <Text style={styles.uniReminderText}>Dining Hall Closures 6/18</Text>
            <TouchableOpacity style={styles.learnMoreButton}>
              <Svg width="95" height="35" viewBox="0 0 95 35" fill="none" >
                <Rect width="95" height="35" rx="17.5" fill="url(#paint0_linear_177_1221)"/>
                <Defs>
                  <LinearGradient id="paint0_linear_177_1221" x1="95" y1="35" x2="-26.9919" y2="9.37755" gradientUnits="userSpaceOnUse">
                    <Stop stopColor="#92A3FD"/>
                    <Stop offset="1" stopColor="#9DCEFF"/>
                  </LinearGradient>
                </Defs>
              </Svg>
              <Text style={styles.learnMoreButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.closeButtonBlue}>
            <Image source={require('../../assets/images/x-icon.png')} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            Latest Deals near you
          </Text>
          <TouchableOpacity onPress={() => router.navigate("./Discounts")} style={styles.seeMoreButton}>
            <Text style={styles.seeMoreText}>See more</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Whole Foods</Text>
            <Text style={styles.cardSubtitle}>14th ST NW</Text>
            <Text style={styles.cardDescription}>50% off all ice cream</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Safeway</Text>
            <Text style={styles.cardSubtitle}>21st ST SE</Text>
            <Text style={styles.cardDescription}>Show Student ID for Rewards.</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Trader Joes</Text>
            <Text style={styles.cardSubtitle}>21st ST SE</Text>
            <Text style={styles.cardDescription}>Free Delivery 6/18 through 6/20</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Harris Teeter</Text>
            <Text style={styles.cardSubtitle}>21st ST SE</Text>
            <Text style={styles.cardDescription}>20% on office supplies.</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>
            Dining Hall Menu
          </Text>
          <TouchableOpacity onPress={() => router.navigate("./DiningHallMenu")} style={styles.seeMoreButton}>
            <Text style={styles.seeMoreText}>See more</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} style={styles.horizontalScroll}>
          <TouchableOpacity onPress={() => Linking.openURL('https://dineoncampus.com/NYUeats')}>
            <Image source={require('../../assets/images/breakfast.png')} style={styles.menuImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://dineoncampus.com/NYUeats')}>
            <Image source={require('../../assets/images/lunch.png')} style={styles.menuImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://dineoncampus.com/NYUeats')}>
            <Image source={require('../../assets/images/dinner.png')} style={styles.menuImage} />
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  welcomeText: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  userNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationIcon: {
    width: 20,
    height: 20,
  },
  reminderContainer: {
    position: 'relative',
    marginBottom: 10,
    alignItems: 'flex-start', 
  },
  reminderSvg: {
    marginLeft: 0, 
  },
  reminderImage: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 60, 
    height: 60, 
  },
  reminderTextContainer: {
    position: 'absolute',
    top: 20,
    left: 90,
  },
  reminderText: {
    fontSize: 15,
    color: '#FF0000',
  },
  reminderDetailText: {
    fontSize: 14,
    color: '#000000',
    marginTop: 8,
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
  blueContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  blueSvg: {
    marginLeft: 0,
  },
  closeButtonBlue: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  uniReminderImage: {
    position: 'absolute',
    top: 0,
    right: 50,
    width: 140,
    height: 140,
    resizeMode: 'contain'
  },
  uniReminderTextContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  uniReminderTextHeader: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  uniReminderText: {
    fontSize: 14,
    color: '#000',
    marginTop: 8,
  },
  learnMoreButton: {
    position: 'absolute',
    top: 60,
    left: 0,
  },
  learnMoreButtonText: {
    position: 'absolute',
    top: 9,
    left: 13,
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeMoreButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  seeMoreText: {
    color: '#92A3FD',
    fontSize: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: (width - 60) / 2,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#7D7D7D',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
  },
  horizontalScroll: {
    flexDirection: 'row',
    marginTop: 10,
  },
  menuImage: {
    width: 250,
    height: 250,
    marginRight: 10,
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

export default Home;
