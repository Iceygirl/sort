
// 父子通信
// 子组件
var headerTip = {
    template:`<p>{{name}}来看啦</p>`,
    props:['name'],
    data() {
        return {
        }
    },  
}

// 过滤器：一般只用最后的格式化
Vue.filter('currency',(val,unit)=>{
    val = val || 0
    unit = unit || '元'
    return val + unit
})

new Vue({
    el:'#app',
    components:{
        'head-tip':headerTip
    },
    data: {
        price:12
    }
})

// ---------------------------------------------------------------



// 子父通信
// 子组件
Vue.component('son',{
    template:`<button @click="onClick">显示</button>`,
    data() {
        return {
            isShow:false
        }
    },
    methods: {
        onClick() {
            this.isShow = !this.isShow
            this.$emit('onShow',this.isShow)
        }
    }
})

// 父组件
Vue.component('parent',{
    template:`
    <div>
        <son @onShow="onShow"></son>
        <p v-if="isShowTip">显示啦</p>
    </div>`,
    data() {
        return {
            isShowTip:false
        }
    },
    methods: {
        onShow(data) {
            this.isShowTip = data
        }
    }
})




// ----------------------------------------------------
// 任意组件，平行组件通信
var Event = new Vue()

Vue.component('haha',{
    template:`<div>我说：<input type="text" @keyup="onChange" v-model="iSaid"></div>`,
    data() {
        return {
            iSaid:''
        }
    },
    methods:{
        onChange() {
            Event.$emit('hahaSaidThings',this.iSaid)
        }
    }
})

Vue.component('xixi',{
    template:`<div>haha说：{{hahaSaid}}</div>`,
    data() {
        return {
            hahaSaid:''
        }
    },
    mounted(){
        var _this = this
        Event.$on('hahaSaidThings',(data)=>{
            _this.hahaSaid = data
        })
    }
})




new Vue({
    el:'#seg'
})