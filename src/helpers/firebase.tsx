import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  doc,
  where,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { setLoggedIn } from "../Redux/reducers";
import { store } from "../Redux/store";

const firebaseConfig = {
  apiKey: "AIzaSyA6qs_gFyouOYeit7PxWrkIutDPnwXGi5E",
  authDomain: "minitennis-ecc0f.firebaseapp.com",
  databaseURL: "https://minitennis-ecc0f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "minitennis-ecc0f",
  storageBucket: "minitennis-ecc0f.appspot.com",
  messagingSenderId: "785629817720",
  appId: "1:785629817720:web:17f30d4e43a9b7ada5b68d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/** BONKERS FIRESTORE SHIT 
const initialState = {
  matchHistory: [],
  myMatchHistory: [],
  incomingMatches: [],
  declareWinnerMatches: [],
};

// Create the reducer for your Firestore data
const rootReducer = combineReducers({
  firestore: firestoreReducer,
});

// Create the store
const store = createStore(rootReducer);

// Add the Redux bindings for Firestore
const firestore = reduxFirestore(store);
/* END OF BONKERS SHIT */

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      alert(err.message);
    }
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      if (err.message.indexOf('(auth/user-not-found)') > -1)
        alert('No user found for ' + email);
      else if (err.message.indexOf('auth/wrong-password') > -1)
        alert('Wrong email or password.');
      else
        alert("Something went wrong, we'll look into it");
    }
  }
};

const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      rating: 1000
    });
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      alert(err.message);
    }
  }
};

auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(setLoggedIn(true));
  } else {
    store.dispatch(setLoggedIn(false));
  }
});

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      alert(err.message);
    }
  }
};

const logOutUser = async () => {
  await signOut(auth).then(() => window.location.href = '/');
  //await auth.signOut();
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logOutUser,
};