import * as firebase from 'firebase/app'
import 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { Scheduler } from './scheduler';

const firebaseConfig = {
    apiKey: "AIzaSyDNeJc6JswSew7T1OZLFY2zu5N0WeqjmAw",
    authDomain: "timescheduler-603eb.firebaseapp.com",
    projectId: "timescheduler-603eb",
    storageBucket: "timescheduler-603eb.appspot.com",
    messagingSenderId: "710132416090",
    appId: "1:710132416090:web:eacf25e84f626ebe4c2263",
    measurementId: "G-NGTGZL63FY"
};
  
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

const scheduler = new Scheduler(db);

export default scheduler;