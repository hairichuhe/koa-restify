import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import routes from './routes'
import Mock from './mock'
Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
import vueAjax from '../utils/vueAjax'
import utils from '../utils/utils'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(vueAjax)

Vue.use(utils)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    //NProgress.start();
    if (to.path == '/login') {
        sessionStorage.removeItem('access_token');
    }
    let token = sessionStorage.getItem('access_token');
    if (!token && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next()
    }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
    //el: '#app',
    //template: '<App/>',
    data: {
        host:process.env.API_ROOT,
        loginHost:process.env.LOGIN_ROOT
    },
    router,
    store,
    //components: { App }
    render: h => h(App)
}).$mount('#app')
