import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
mode: 'history',
base: process.env.VUE_APP_BASE_ROUTER,
routes:[
{
    path:  '*',
    name:'error404',
    meta:{title:'404-page...'},
    component: ()=> import('../views/PageNotFound.vue'),
},

{
    path: '/',
    name:'home',
    meta:{title:'Home'},
    component: ()=> import('../views/Home'),
},


{
    path: '/site/signin',
    name:'signin',
    meta:{title:'Applicant sign in'},
    component: ()=> import('../auth/Signin.vue'),
},


{
    path: '/secure/adminaccount',
    name:'adminaccount',
    meta:{title:'New user account'},
    component: ()=> import('../forms/adminaccount'),
},

{
    path: '/site/accountslip',
    name:'newaccountslip',
    meta:{title:'Registration Slip'},
    component: ()=> import('../forms/newAccountSlip'),
},

{
    path: '/secure/dashboard',
    name:'dashboard',
    meta:{title:'Dashboard'},
    component: ()=> import('../secure/Dashboard.vue'),
},

{
    path: '/secure/history',
    name:'history',
    meta:{title:'History'},
    component: ()=> import('../api/chathistory.vue'),
},

{
    path: '/secure/chatpanel/:id',
    name:'chatpanel',
    meta:{title:'Chat panel'},
    component: ()=> import('../secure/Chatpanel.vue'),
},

{
    path: '/site/auth-check',
    name:'validation',
    meta:{title:'Loggin...'},
    component: ()=> import('../auth/Auth-check.vue'),
},


{
    path: '/site/logout',
    name:'logout',
    meta:{title:'Logout'},
    component: ()=> import('../auth/Logout.vue'),
},


{
    path: '/site/contactus',
    name:'contactus',
    meta:{title:'Payment'},
    component: ()=> import('../views/Contactus.vue'),
},

]
})