import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { auth, db } from "../support/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "expo-router";

function Home() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const userDoc = doc(db, "users", userId);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUsername(userData.username || "User");
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

  return (
    <View>
      <Text>
        Welcome , <Text>{username}</Text>
      </Text>
      <Text>insights</Text>
      <Text>Here are the promotions available</Text>
    </View>
  );
}

export default Home;
