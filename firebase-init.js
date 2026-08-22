// ============================================================
// Firebase configuration
// ------------------------------------------------------------
// Replace these placeholder values with the config from your
// own Firebase project: Project settings → General → Your apps.
// These values are NOT secret — they identify your project only.
// Real access control is enforced by Firestore security rules
// and Firebase Authentication, not by hiding this config.
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyDprz2cAmumCXJD7cLtagPKp6z5TPgHCKo",
  authDomain: "fajer-plastics.firebaseapp.com",
  projectId: "fajer-plastics",
  storageBucket: "fajer-plastics.firebasestorage.app",
  messagingSenderId: "571656253588",
  appId: "1:571656253588:web:4119539684f93fdb730481"
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, collection, addDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };

// Called from script.js when a customer submits an order.
// Saves it to the "orders" collection so it shows up in admin.html.
window.saveOrderToFirestore = async function(order){
  return addDoc(collection(db, "orders"), {
    items: order.items,           // [{code, name, qty}, ...]
    name: order.name || "",
    company: order.company || "",
    phone: order.phone || "",
    email: order.email || "",
    notes: order.notes || "",
    status: "New",
    createdAt: serverTimestamp()
  });
};
