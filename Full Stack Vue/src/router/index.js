import {createRouter, createWebHistory} from 'vue-router';

import Home from "../views/pages/Home.vue"
import Login from "../views/pages/Login.vue"
import userProfile from "../views/pages/userProfile.vue"
import Signup from "../views/pages/Signup.vue"
import Createpost from "../views/pages/Createpost.vue"
import SinglePost from "../views/pages/SinglePost.vue"
import Search from "../views/pages/Search.vue"

const ifAuthenticated = (to, from, next) =>{
    const loggedIn = localStorage.getItem('session_token');
    if(loggedIn){
        next()
        return
    }
    next('/login')
}

const routes = [
    {path: '/', component:Home},
    {path: '/login', component:Login},
    {path: '/userProfile/:id', component:userProfile, beforeEnter: ifAuthenticated},
    {path: '/signup', component: Signup},
    {path: '/createpost', component: Createpost, beforeEnter: ifAuthenticated},
    {path:"/posts/:id", component:SinglePost},
    {path:"/Search", component:Search}
    // {path: '/dashboard', compponent: Dashboard, beforeEnter: ifAuthenticated}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;