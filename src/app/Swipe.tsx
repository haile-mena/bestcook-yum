import React from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const Swipe = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.centeredTextContainer}>
          <Text style={styles.title}>Meal Plan Account</Text>
          <Text style={styles.uid}>UID: 4326455</Text>
        </View>
        <View style={styles.card}>
          <Image source={require('../../assets/images/mealswipeblock.png')} style={styles.cardImage} />
          <Text style={[styles.cardText, styles.mealSwipesText]}>Meal Swipes Remaining</Text>
          <Text style={[styles.cardValue, styles.mealSwipesValue]}>98 Swipes</Text>
        </View>
        <View style={styles.card}>
          <Image source={require('../../assets/images/bucksblock.png')} style={styles.cardImage} />
          <Text style={[styles.cardText, styles.campusBucksText]}>Campus Bucks Remaining</Text>
          <Text style={[styles.cardValue, styles.campusBucksValue]}>$235.00</Text>
        </View>
        <Text style={styles.transactionsTitle}>Transactions</Text>
        <Image source={require('../../assets/images/transactions.png')} style={styles.transactionsImage} />
        <View style={styles.transactionDetails}>
          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>Uni Cafe</Text>
            <Text style={styles.transactionDate}>10/12/24, 7:18am</Text>
            <Text style={styles.transactionAmount}>-$6.50</Text>
          </View>
          <View style={styles.transactionSeparator} />
          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>Uni Dining</Text>
            <Text style={styles.transactionDate}>10/8/24, 10:00am</Text>
            <Text style={styles.transactionAmount}>-$12.00</Text>
          </View>
          <View style={styles.transactionSeparator} />
          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>Uni Cafe</Text>
            <Text style={styles.transactionDate}>10/3/24, 9:00pm</Text>
            <Text style={styles.transactionAmount}>-$30.76</Text>
          </View>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>View all</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.donateText}>Extra meal swipes? Donate!</Text>
        <Image source={require('../../assets/images/donation.png')} style={styles.donationImage} resizeMode="contain" />
        <TouchableOpacity style={styles.donateButton}>
          <LinearGradient colors={['#92A3FD', '#9DCEFF']} style={styles.gradient}>
            <Text style={styles.donateButtonText}>Donate</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => router.navigate("./Home")}>
          <Image source={require('../../assets/images/Home.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.navigate("./Swipe")}>
          <Image source={require('../../assets/images/Activity.png')} style={[styles.icon, { marginRight: 50 }]} />
        </TouchableOpacity>
        <View style={styles.circleButton}>
          <Image source={require('../../assets/images/Scan.png')} style={styles.scanIcon} />
        </View>
        <Image source={require('../../assets/images/Buy.png')} style={[styles.icon, { marginLeft: 50 }]} />
        <Image source={require('../../assets/images/Profile.png')} style={styles.icon} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 150,
  },
  centeredTextContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  uid: {
    fontSize: 16,
    color: '#7D7D7D',
    textAlign: 'left',
    marginBottom: 10,
  },
  card: {
    alignItems: 'center',
    marginBottom: -20, // Further reduced margin to bring blocks closer together
  },
  cardImage: {
    width: width - 10, // Made the image wider
    height: (width - 10) / 2, // Adjusted height accordingly
    borderRadius: 10,
  },
  cardText: {
    position: 'absolute',
    top: '15%', // Adjusted position
    left: '10%',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  cardValue: {
    position: 'absolute',
    top: '30%', // Adjusted position
    left: '10%',
    fontSize: 16,
    color: 'white',
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: -30,
  },
  transactionsImage: {
    width: width - 35,
    height: (width - 40) * 0.78, // Increased height for more content space
    marginBottom: 10,
  },
  transactionDetails: {
    position: 'absolute',
    top: '67%', 
    left: '10%',
    width: width - 80,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  transactionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionSeparator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 5,
  },
  viewAllButton: {
    marginTop: 20,
    marginLeft: 250,
    alignSelf: 'center',
    backgroundColor: '#92A3FD',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  viewAllButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  donateText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: -30,
    marginBottom: 20,
    marginRight: 180,
  },
  donationImage: {
    width: width - 30,
    marginTop: -100,
    height: undefined,
    aspectRatio: 3.5, // Adjust aspect ratio as per your image
    alignSelf: 'center',
    marginBottom: 10,
  },
  donateButton: {
    alignSelf: 'center',
    width: 100,
    height: 40,
    borderRadius: 20,
    marginLeft: 250,
    marginTop: -90,
 
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  donateButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
    top: -35, // Adjust the value to move the button higher or lower
    left: width / 2 - 35, // Center the button horizontally
    width: 70, // Slightly bigger
    height: 70, // Slightly bigger
    borderRadius: 35, // Adjusted for new size
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

export default Swipe;
