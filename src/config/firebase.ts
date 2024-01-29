import { FirebaseOptions, initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import {
  child as databaseChild,
  get as databaseGet,
  getDatabase,
  onValue as onValueInDatabase,
  push as databasePush,
  ref as databaseRef,
  remove as databaseRemove,
} from 'firebase/database';

import { env } from './env';

const firebaseOptions: FirebaseOptions = {
  apiKey: env.apiKey,
  authDomain: env.authDomain,
  databaseURL: env.databaseURL,
  projectId: env.projectId,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId,
  appId: env.appId,
};

const app = initializeApp(firebaseOptions);

const auth = getAuth(app);
const database = getDatabase(app);

export {
  auth,
  database,
  databaseChild,
  databaseGet,
  databasePush,
  databaseRef,
  databaseRemove,
  GoogleAuthProvider,
  onAuthStateChanged,
  onValueInDatabase,
  signInWithPopup,
};
