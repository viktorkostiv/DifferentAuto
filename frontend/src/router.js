import {
    createRouter,
    createWebHistory
} from 'vue-router';

import HomePage from './components/Site/pages/HomePage.vue';
import CarsPage from './components/Site/pages/CarsPage.vue';
import CarPage from './components/Site/pages/CarPage.vue';

import CarsIndex from './components/Admin/Cars/CarsIndex.vue';
import CarsModel from './components/Admin/Cars/CarsModel.vue';
import CarsEdit from './components/Admin/Cars/CarsEdit.vue';
import MessagesIndex from './components/Admin/Messages/MessagesIndex.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        component: HomePage,
    }, {
        path: '/cars',
        component: CarsPage,
    }, {
        path: '/car/:id',
        component: CarPage,
    }, {
        path: '/admin/cars',
        component: CarsIndex,
    }, {
        path: '/admin/cars/:id',
        component: CarsModel,
    }, {
        path: '/admin/cars/edit/:id',
        component: CarsEdit,
    }, {
        path: '/admin/cars/new/:id',
        component: CarsEdit,
    }, {
        path: '/admin/messages',
        component: MessagesIndex,
    }, ],
});

export default router;