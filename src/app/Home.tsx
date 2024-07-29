import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { auth, db } from "../support/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "expo-router";

function Home() {
  const [firstName, setFirstname] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [firstTime, setIsFirstTime] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        console.log("there is a current user");
        const userId = auth.currentUser.uid;
        console.log("User-id = ", userId);
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
        router.push("/Login");
      }
    };

    fetchUserData();
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

      <Text>Reminder</Text>
      <Text>Here are the promotions available</Text>
    </View>
  );
}

export default Home;
