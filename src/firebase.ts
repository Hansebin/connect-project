import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6mHF92rtXlET0DpYaJM2SgPJ8yB3onC0",
  authDomain: "connect-2224a.firebaseapp.com",
  projectId: "connect-2224a",
  storageBucket: "connect-2224a.appspot.com",
  messagingSenderId: "176679283767",
  appId: "1:176679283767:web:da7c507664b2131a7523b2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
