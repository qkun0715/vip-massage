import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/Main';
import Home from './views/Home.vue';
import OrderForm from './views/OrderForm';
import Personal from './views/Personal';
import Groups from './views/Groups';
import Subscribe from './views/Subscribe';
import Technician from './views/Technician'
import SelectionTime from './views/SelectionTime'
import MyIntegral from './views/MyIntegral'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main,
            redirect: '/home',
            children: [
                {path: '/home', name: 'Home', component: Home},
                {path: '/orderForm', name: 'OrderForm', component: OrderForm},
                {path: '/personal', name: 'Personal', component: Personal},
            ],
        },
        {path: '/groups', name: 'Groups', component: Groups},
        {path: '/subscribe', name: 'Subscribe', component: Subscribe},
        {path: '/technician', name: 'Technician', component: Technician},
        {path: '/selectionTime', name: 'SelectionTime', component: SelectionTime},
        {path: '/myIntegral', name: 'MyIntegral', component: MyIntegral},
    ],
});
