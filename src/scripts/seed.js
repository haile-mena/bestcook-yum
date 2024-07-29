import "dotenv/config";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../support/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

async function seedDatabase() {
  try {
    // NewApp University Users collection
    const usersRef = collection(db, "Users");
    const userDoc = await addDoc(usersRef, {
      University: "MTSU",
      allergiesCompleted: false,
      createdAt: new Date(),
      email: "cgo2e@mtmail.mtsu.edu",
      firstName: "Christabel",
      lastName: "Obi-Nwosu",
      swipes: 0,
      uid: "AV2mrezSJtekALlpooeEfyvRAj22",
    });

    // NewApp Products collection
    const productsRef = collection(db, "Products");
    const productDoc = await addDoc(productsRef, {
      userId: userDoc.id,
      items: [
        {
          productId: "prod1",
          productName: "Laptop",
          quantity: 2,
          expiryDate: new Date("2025-06-30"),
        },
        {
          productId: "prod2",
          productName: "Headphones",
          quantity: 4,
          expiryDate: new Date("2025-06-30"),
        },
      ],
    });

    // NewApp Recipes collection
    const recipesRef = collection(db, "Recipes");
    const recipeDoc = await addDoc(recipesRef, {
      userId: userDoc.id,
      recipeTitle: "Chocolate Cake",
      ingredients: ["Chocolate", "Flour", "Sugar"],
      steps: ["Mix ingredients.", "Bake for 30 minutes."],
      author: "admin",
    });

    // NewApp Transactions collection
    const transactionsRef = collection(db, "Transactions");
    const transactionDoc = await addDoc(transactionsRef, {
      senderUserId: userDoc.id,
      receiverUserId: "anotherUserId",
      amount: 50,
      transactionDate: new Date(),
    });

    // NewApp Promotions collection
    const promotionsRef = collection(db, "Promotions");
    const promotionDoc = await addDoc(promotionsRef, {
      title: "Winter Sale",
      description: "30% off on selected electronics!",
      discountRate: 0.3,
      endDate: new Date("2024-12-31"),
      createdOn: new Date(),
    });

    // NewApp Orders collection
    const ordersRef = collection(db, "Orders");
    const orderDoc = await addDoc(ordersRef, {
      userId: userDoc.id,
      products: [
        {
          productId: "prod1",
          productName: "Laptop",
          quantity: 1,
          status: "processing",
          deliveryAddress: "456 Elm St",
        },
      ],
      orderDate: new Date(),
    });

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
