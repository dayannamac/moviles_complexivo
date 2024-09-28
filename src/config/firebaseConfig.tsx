import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyD9wT7d0WRQH1tmAgbCegtiT_5ZA1Ps7Us",
    authDomain: "crazywings-complex.firebaseapp.com",
    projectId: "crazywings-complex",
    storageBucket: "crazywings-complex.appspot.com",
    messagingSenderId: "673001646284",
    appId: "1:673001646284:web:aaa0b3c584af08e136ba69",
    databaseURL: "https://crazywings-complex-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const dbRealTime = getDatabase(firebase);
