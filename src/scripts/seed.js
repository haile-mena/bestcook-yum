import "dotenv/config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../support/firebase";

async function seedDatabase() {
  // Best-cook Users collection
  const usersRef = collection(db, "Users");
  const userDoc = await addDoc(usersRef, {
    name: "Christabel",
    email: "Christabel@example.com",
    password: "christabel", //Can hash it
    //accountType: "student",
    swipes: 10,
    createdAt: new Date(),
  });

  // Best-cook Inventory collection
  const inventoryRef = collection(db, "Inventory");
  const inventoryDoc = await addDoc(inventoryRef, {
    userId: userDoc.id,
    items: [
      {
        itemId: "item1",
        itemName: "Apples",
        quantity: 5,
        expiryDate: new Date("2024-12-31"),
      },
      {
        itemId: "item2",
        itemName: "Bananas",
        quantity: 3,
        expiryDate: new Date("2024-12-31"),
      },
    ],
  });

  // Best-cook Recipes collection
  const recipesRef = collection(db, "Recipes");
  const recipesDoc = await addDoc(recipesRef, {
    userId: userDoc.id,
    recipeName: "Banana Smoothie",
    ingredients: ["Bananas", "Milk", "Honey"],
    steps: ["Blend all ingredients until smooth.", "Serve chilled."],
    createdBy: "admin",
  });

  // Best-cook Swipes collection
  const swipesRef = collection(db, "Swipes");
  const swipesDoc = await addDoc(swipesRef, {
    fromUserId: userDoc.id,
    toUserId: "recipientUserId",
    swipeCount: 3,
    createdAt: new Date(),
  });

  // Best-cook  Promotions/Discounts collection
  const promotionsRef = collection(db, "Discounts");
  const promotionsDoc = await addDoc(promotionsRef, {
    title: "Summer Sale",
    description: "Up to 50% off on selected items!",
    discount: 0.5,
    expiryDate: new Date("2024-08-31"),
    createdAt: new Date(),
  });

  // Best-cook Deliveries collection
  const deliveriesRef = collection(db, "Deliveries");
  const deliveriesDoc = await addDoc(deliveriesRef, {
    userId: userDoc.id,
    items: [
      {
        itemId: "item1",
        itemName: "Groceries",
        quantity: 1,
        status: "pending",
        deliveryAddress: "123 Main St",
      },
    ],
    createdAt: new Date(),
  });

  console.log("Database seeded successfully");
}

seedDatabase().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
