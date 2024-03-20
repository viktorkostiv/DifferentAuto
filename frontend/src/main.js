import './assets/css/app.css';
import 'primevue/resources/themes/aura-dark-noir/theme.css';
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import {createPinia} from "pinia";

import Notifications from 'notiwind';
import PrimeVue from 'primevue/config';

import router from './router.js';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia()).use(PrimeVue).use(router).use(Notifications).mount("#app");

