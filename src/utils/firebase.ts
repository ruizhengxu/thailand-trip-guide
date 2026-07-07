import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsabfyWH_AeRKW6IEFoFyIBMfj4HxRC50",
  authDomain: "thailand-trip-2026-37a81.firebaseapp.com",
  projectId: "thailand-trip-2026-37a81",
  storageBucket: "thailand-trip-2026-37a81.firebasestorage.app",
  messagingSenderId: "386520617540",
  appId: "1:386520617540:web:47ed917954077d7bf12211"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const FAVORITES_COLLECTION = "trip_data";
const FAVORITES_DOC = "shared_favorites";

export function subscribeToFavorites(
  onUpdate: (favorites: string[]) => void,
  defaultFavorites: string[]
) {
  const docRef = doc(db, FAVORITES_COLLECTION, FAVORITES_DOC);
  
  return onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Array.isArray(data.list)) {
          onUpdate(data.list);
        }
      } else {
        // Document doesn't exist yet in cloud, initialize it with default/local favorites
        setDoc(docRef, { list: defaultFavorites }).catch((err) => {
          console.error("Failed to initialize cloud favorites:", err);
        });
        onUpdate(defaultFavorites);
      }
    },
    (error) => {
      console.error("Error listening to cloud favorites:", error);
      // If error occurs (e.g. offline), we keep using local state
    }
  );
}

export async function saveFavoritesToCloud(favorites: string[]) {
  try {
    const docRef = doc(db, FAVORITES_COLLECTION, FAVORITES_DOC);
    await setDoc(docRef, { list: favorites }, { merge: true });
  } catch (error) {
    console.error("Failed to save favorites to cloud:", error);
  }
}

export function subscribeToVisited(
  onUpdate: (visited: string[]) => void,
  defaultVisited: string[]
) {
  const docRef = doc(db, FAVORITES_COLLECTION, FAVORITES_DOC);
  
  return onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Array.isArray(data.visited)) {
          onUpdate(data.visited);
        } else {
          onUpdate(defaultVisited);
        }
      } else {
        setDoc(docRef, { visited: defaultVisited }, { merge: true }).catch((err) => {
          console.error("Failed to initialize cloud visited:", err);
        });
        onUpdate(defaultVisited);
      }
    },
    (error) => {
      console.error("Error listening to cloud visited:", error);
    }
  );
}

export async function saveVisitedToCloud(visited: string[]) {
  try {
    const docRef = doc(db, FAVORITES_COLLECTION, FAVORITES_DOC);
    await setDoc(docRef, { visited }, { merge: true });
  } catch (error) {
    console.error("Failed to save visited to cloud:", error);
  }
}
