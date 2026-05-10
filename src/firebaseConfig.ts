import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvpZpEINoIQeHlUY-UGCqoul3U2SG5ZJI",
  authDomain: "controle-funcionarios-e45ca.firebaseapp.com",
  projectId: "controle-funcionarios-e45ca",
  storageBucket: "controle-funcionarios-e45ca.firebasestorage.app",
  messagingSenderId: "415216010485",
  appId: "1:415216010485:web:81c711da2ed0ca7b9831bc",
  measurementId: "G-4ENM6E8C1L",
};

//Inicializa o Firebase
const app = initializeApp(firebaseConfig);

//Export serviços do firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
