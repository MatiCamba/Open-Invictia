// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB67uoEPVeLdheHLe29he_diHyad3DOkN8",
    authDomain: "app-de-crossfit.firebaseapp.com",
    projectId: "app-de-crossfit",
    storageBucket: "app-de-crossfit.appspot.com",
    messagingSenderId: "1061856641243",
    appId: "1:1061856641243:web:aeb11a362dc801a1c5ccfe"
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase)
export const storage = getStorage(appFirebase)
export const db = getFirestore(appFirebase)

export const uploadFile = async (file) => {
    const storageRef = ref(storage, file.name)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}