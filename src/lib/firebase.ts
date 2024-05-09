import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnE0pmU6KHm6wJetrGrn5LsaUfbwB4KB8",
  authDomain: "linkme-dev-e5a85.firebaseapp.com",
  projectId: "linkme-dev-e5a85",
  storageBucket: "linkme-dev-e5a85.appspot.com",
  messagingSenderId: "889314448219",
  appId: "1:889314448219:web:8d1ced33c8c974a8ce407e",
  measurementId: "G-002ZTB3B8J"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();


/**
 * @returns a store with the current firebase user
 */

function userStore() {
  let unsubscribe: () => void;

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });
    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}