import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, ScrollView } from "react-native";
import { db } from "../support/firebase";

export default function Menu() {
  const [menu, setMenu] = useState<any | null>(null);

  useEffect(() => {
    const getMenu = async () => {
      try {
        const menuRef = collection(db, "Menu");
        const docSnapshot = await getDocs(menuRef);
        const menuData = docSnapshot.docs.map((doc) => doc.data())[0];
        setMenu(menuData);
      } catch (error) {
        console.error("Error fetching menu: ", error);
      }
    };
    getMenu();
  }, []);

  return (
    <ScrollView>
      <Text>Breakfast</Text>
      {menu?.breakfast?.map((item: any) => (
        <Text key={item.itemId}>
          {item.itemName}: {item.description}
        </Text>
      ))}

      <Text>Lunch</Text>
      {menu?.lunch?.map((item: any) => (
        <Text key={item.itemId}>
          {item.itemName}: {item.description}
        </Text>
      ))}

      <Text>Dinner</Text>
      {menu?.dinner?.map((item: any) => (
        <Text key={item.itemId}>
          {item.itemName}: {item.description}
        </Text>
      ))}

      <Text>Appetizers</Text>
      {menu?.appetizers?.map((item: any) => (
        <Text key={item.itemId}>
          {item.itemName}: {item.description}
        </Text>
      ))}
    </ScrollView>
  );
}
