import Vue from 'vue'
import Router from 'vue-router'
// "@"相当于".."
import home from '@/components/home'
// 进行路由配置,规定'/'引入到home组件
const loginpage = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: loginpage
        },
        {
            path: '/login',
            name: 'login',
            component: loginpage
        },
        {
            path: '/home',
            name: 'home',
            component: home
        }
    ]
})

//对每次访问之前都要先看是否已经登录
router.beforeEach((to, from, next) => {
    // 如果是登录页放行
    if (to.path.startsWith('/login')) {
        window.sessionStorage.removeItem("access-token");
        // 否则进入下一步
        next();
    } else {
        // 获取token
        let token = window.sessionStorage.getItem("access-token");
        // 如果没有token
        if (!token) {
            //未登录  跳回主页面
            next({
              path: '/login'
            });
        } else {
            // 否则进入下一步
            next();
        }
    }
})

// 设置默认路由
export default router
