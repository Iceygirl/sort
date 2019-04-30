const routes = [{
    path:'/',
    component:{
        template:`
            <div>首页</div>
        `
    }
},{
    path:'/login',
    component:{
        template:`
            <div>登录页</div>
        `
    }
},{
    path:'/post',
    meta: {
        loginRequire:true
    },
    component:{
        template:`
            <div>帖子管理
            <router-link to="more" append>查看更多</router-link>
            <router-view></router-view>
            </div>
        `
    },
    children:[{
        path:'more',
        component:{
            template:`
            <div>更多详细信息</div>
            `
        }
    }]
}]

var router = new VueRouter({
    routes:routes
})

// 访问权限
router.beforeEach(function(to,from,next){
    var loggedIn = false
    if(!loggedIn && to.matched.some(function(item) {
        // item.path == '/post'
        return item.meta.loginRequire
    })) {
        next('/login');
    } else {
        next();
    }
})

new Vue({
    el:'#app',
    router
})