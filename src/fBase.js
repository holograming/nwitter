// Firebase
// module 이름과 새로 생성한 파일이름 중복시 혼동을 방지하기 위해 이름 수정

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile,
         GoogleAuthProvider, 
         GithubAuthProvider } from "firebase/auth";

import { getFirestore, addDoc, collection, getDocs, onSnapshot, doc, deleteDoc, updateDoc, query, where, orderBy } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Do it once. export!
export const authService = getAuth();
export { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile, GoogleAuthProvider, GithubAuthProvider };
// about Firestore
export const dbService = getFirestore();
export { addDoc, collection, getDocs, onSnapshot, doc, deleteDoc, updateDoc, query, where, orderBy };
// about Storage
export const storageService = getStorage();
export { ref, uploadString, getDownloadURL, deleteObject };