import { useEffect, useState } from "react";
import { View, Text, LogBox, Button } from "react-native";
import { auth, db } from "../support/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useRouter } from "expo-router";

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
  let message = "";
  firstTime ? (message = "Welcome back") : (message = "Welcome");
  return (
    <View>
      <Text>
        {message} <Text>{firstName}</Text>
      </Text>
      {/* The below button is to be converted to the notification icon during front-end,  */}
      <Button
        onPress={() => router.navigate("./Notifications")}
        title="notification"
      />
      <Text>We do the planning, you do the eating.</Text>
      <Text>Reminder</Text>
      <Text>Message from university</Text>
      <Text>
        Latest Deals near you{"       "}
        <Text onPress={() => router.navigate("./Discounts")}> see more</Text>
      </Text>
      <Text>Here are the promotions available</Text>
      {discounts.length > 0 ? (
        discounts.map((discount, index) => (
          <View key={index}>
            <Text>{discount.title}</Text>
            <Text>{discount.description}</Text>
            <Text>{discount.discount * 100}%</Text>
            <Text>
              {" "}
              Discount is available until{" "}
              {discount.expiryDate.toDate().toDateString()}
            </Text>
          </View>
        ))
      ) : (
        <Text>There are no available promotions</Text>
      )}

      <Text>Dinning hall menu</Text>
      {"           "}
      <Text onPress={() => router.navigate("./menu")}>See mmore</Text>
      <Text onPress={() => router.navigate("./menu")}>Breakfast</Text>
      <Text onPress={() => router.navigate("./menu")}>Lunch</Text>
      <Text onPress={() => router.navigate("./menu")}>Dinner</Text>

      {/* Fetched dinning menu from database will be displayed here */}
    </View>
  );
}

export default Home;
function atch(error: any) {
  throw new Error("Function not implemented.");
}
