import "dotenv/config";
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../support/firebase";

async function resetDatabase() {
  // Delete all documents from Users collection
  const usersRef = collection(db, "Users");
  const usersSnapshot = await getDocs(usersRef);
  usersSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });

  // Delete all documents from Inventory collection
  const inventoryRef = collection(db, "Inventory");
  const inventorySnapshot = await getDocs(inventoryRef);
  inventorySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });

  // Delete all documents from Recipes collection
  const recipesRef = collection(db, "Recipes");
  const recipesSnapshot = await getDocs(recipesRef);
  recipesSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });

  // Delete all documents from Swipes collection
  const swipesRef = collection(db, "Swipes");
  const swipesSnapshot = await getDocs(swipesRef);
  swipesSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });

  // Delete all documents from Promotions/Discounts collection
  const promotionsRef = collection(db, "Promotions/Discounts");
  const promotionsSnapshot = await getDocs(promotionsRef);
  promotionsSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });

  // Delete all documents from Deliveries collection
  const deliveriesRef = collection(db, "Deliveries");
  const deliveriesSnapshot = await getDocs(deliveriesRef);
  deliveriesSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });

  console.log("Database reset successfully");
}

resetDatabase().catch((error) => {
  console.error("Error resetting database:", error);
  process.exit(1);
});
