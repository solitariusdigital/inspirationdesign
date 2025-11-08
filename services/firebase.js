import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAaWV4fUK5ngSmfD_BwuVXd7JVWTQJMy_E",
  authDomain: "inspirationdesign-a9691.firebaseapp.com",
  projectId: "inspirationdesign-a9691",
  storageBucket: "inspirationdesign-a9691.firebasestorage.app",
  messagingSenderId: "472536439167",
  appId: "1:472536439167:web:363f501c1c1a607c0f224a",
  measurementId: "G-HKDGL8L6C1",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
