// PayQuickPay - Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB9RW1EER-zuCsZqXadbBi3W4RNJRFqaJY",
  authDomain: "payquickpay-73fb3.firebaseapp.com",
  projectId: "payquickpay-73fb3",
  storageBucket: "payquickpay-73fb3.firebasestorage.app",
  messagingSenderId: "290917109615",
  appId: "1:290917109615:web:d88a1db85ba3467824a29a",
  measurementId: "G-R4QVW222RB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
console.log("✅ Firebase Ready");
