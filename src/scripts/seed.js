import "dotenv/config";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../support/firebase";

async function seedDatabase() {
  // yumly Users collection
  const usersRef = collection(db, "Users");
  const userDoc = await addDoc(usersRef, {
    name: "Christabel",
    email: "Christabel@example.com",
    password: "christabel", // Can hash it
    swipes: 10,
    createdAt: new Date(),
  });

  // Yumly Inventory collection
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

  // Yumly Recipes collection
  const recipesRef = collection(db, "Recipes");
  const recipesDoc = await addDoc(recipesRef, {
    userId: userDoc.id,
    recipeName: "Banana Smoothie",
    ingredients: ["Bananas", "Milk", "Honey"],
    steps: ["Blend all ingredients until smooth.", "Serve chilled."],
    createdBy: "admin",
  });

  // Yumly Swipes collection
  const swipesRef = collection(db, "Swipes");
  const swipesDoc = await addDoc(swipesRef, {
    fromUserId: userDoc.id,
    toUserId: "recipientUserId",
    swipeCount: 3,
    createdAt: new Date(),
  });

  // Yumly Promotions/Discounts collection
  const promotionsRef = collection(db, "Discounts");
  const promotionsDoc = await addDoc(promotionsRef, {
    title: "Summer Sale",
    description: "Up to 50% off on selected items!",
    discount: 0.5,
    expiryDate: new Date("2024-08-31"),
    createdAt: new Date(),
  });

  // Yumly Deliveries collection
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

  // Yumly Menu collection
  const menuRef = collection(db, "Menu");
  const menuDoc = await addDoc(menuRef, {
    breakfast: [
      {
        itemId: "breakfast1",
        itemName: "Pancakes",
        description: "Fluffy pancakes with syrup",
      },
      {
        itemId: "breakfast2",
        itemName: "Omelette",
        description: "Cheese and ham omelette",
      },
    ],
    lunch: [
      {
        itemId: "lunch1",
        itemName: "Chicken Sandwich",
        description: "Grilled chicken sandwich with lettuce and tomato",
      },
      {
        itemId: "lunch2",
        itemName: "Caesar Salad",
        description: "Romaine lettuce with Caesar dressing and croutons",
      },
    ],
    dinner: [
      {
        itemId: "dinner1",
        itemName: "Spaghetti Bolognese",
        description: "Spaghetti with meat sauce",
      },
      {
        itemId: "dinner2",
        itemName: "Grilled Salmon",
        description: "Grilled salmon with vegetables",
      },
    ],
    appetizers: [
      {
        itemId: "appetizer1",
        itemName: "Bruschetta",
        description: "Tomato and basil bruschetta",
      },
      {
        itemId: "appetizer2",
        itemName: "Mozzarella Sticks",
        description: "Fried mozzarella sticks with marinara sauce",
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
