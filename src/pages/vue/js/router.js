// 路由数组
const routes = [{
    path:'/',
    component:{
        template: `
            <div>首页</div>
        `
    }
},{
    path:'/about',
    name:'about',
    component:{
        template: `
            <div>关于我们</div>
        `
    }
},{
    path:'/user/:name',
    name:'user',
    component:{
        // <div>今年：{{$route.query.age}}</div>
        template: `
            <div>
                我叫：{{$route.params.name}}
                <router-link to="more" append>显示更多</router-link> 
                <router-view></router-view>
            </div>
            
        `
    },
    children:[{
        path:"more",
        component:{
            template:`
            <div>
                用户{{$route.params.name}}的详细信息
            </div>
            `
        }
    }]
}]

var router = new VueRouter({
    routes:routes
})


new Vue({
    el:'#app',
    router,
    methods:{
        jumpTo() {
            this.$router.push({
                name:'user',
                params:{
                    name:'王先森'
                }
            })
        }
    }   
})