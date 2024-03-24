import './assets/css/app.css';
import 'primevue/resources/themes/aura-dark-noir/theme.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import {createPinia} from "pinia";

import Notifications from 'notiwind';
import PrimeVue from 'primevue/config';

import router from './router.js';
import App from './App.vue';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const app = createApp(App);

firebase.initializeApp({
    apiKey: "AIzaSyDZ1ungctjmSX0sgbpnqiXIVNY-GQmza9c",
    authDomain: "different-auto.firebaseapp.com",
    databaseURL: "https://different-auto-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "different-auto",
    storageBucket: "different-auto.appspot.com",
    messagingSenderId: "1001724905023",
    appId: "1:1001724905023:web:69a13cf03d57b1c6b21a8a",
    measurementId: "G-65WCXWJ7BX"
});

app.use(createPinia()).use(PrimeVue).use(router).use(Notifications).mount("#app");

