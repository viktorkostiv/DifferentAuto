import {
    createRouter,
    createWebHistory
} from 'vue-router';

import HomePage from './components/Site/pages/HomePage.vue';
import CarsPage from './components/Site/pages/CarsPage.vue';
import CarPage from './components/Site/pages/CarPage.vue';

import LoginForm from './components/Admin/Auth/LoginForm.vue';
import ResetPassword from './components/Admin/Auth/ResetPassword.vue';
import CarsIndex from './components/Admin/Cars/CarsIndex.vue';
import CarsModel from './components/Admin/Cars/CarsModel.vue';
import CarsEdit from './components/Admin/Cars/CarsEdit.vue';
import MessagesIndex from './components/Admin/Messages/MessagesIndex.vue';
import MessagesModel from './components/Admin/Messages/MessagesModel.vue'

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
    },{
        path: '/auth/login',
        component: LoginForm,
    },{
        path: '/auth/reset-password',
        component: ResetPassword,
    },{
        path: '/admin/cars',
        component: CarsIndex,
    }, {
        path: '/admin/cars/:id',
        component: CarsModel,
    }, {
        path: '/admin/cars/edit/:id',
        component: CarsEdit,
    }, {
        path: '/admin/cars/new',
        component: CarsEdit,
    }, {
        path: '/admin/messages',
        component: MessagesIndex,
    }, {
        path: '/admin/messages/:id',
        component: MessagesModel,
    }, ],
});

export default router;