// 全局组件
Vue.component('alert',{
    template:'<button class="active" @click="onClick">啊哈哈</button>',
    methods: {
        onClick() {
            alert('哈哈哈')
        }
    }
})


var app = new Vue({
    el:'#app',
    data: {
        name:'',
        sex:'female',
        sexLists:[],
        age:12,
        foodLists:[{
            name:"葱",
            price:1,
            discount:.5
        },{
            name:"姜",
            price:2,
            discount:.5
        },{
            name:"蒜",
            price:6
        }],
        url:'http://www.baidu.com',
        isActive:true,
        textarea:'121212',
        select:1,
        selectLists:[],
        role:'hr',
        Chinese:90,
        Math:70,
        English:80
    },
    computed:{
        sum() {
            this.Chinese = this.Chinese || 0
            this.Math = this.Math || 0
            this.English = this.English || 0
            return this.Chinese + this.Math + this.English
        },
        average() {
            return Math.round(this.sum / 3)
        }
    },
    methods:{
        onClick() {
            console.log('clicked')
        },
        onMouseEnter() {
            console.log('mouse entered')
        },
        onMouseOut() {
            console.log('mouse out')
        },
        onSubmit(e) {
            // e.preventDefault()
            console.log('submit')
        },
        onEnter() {
            console.log('按下回车')
        }
    }
})



// 局部组件
var haha_component = {
    template:'<button class="active" @click="onClick">啊哈哈</button>',
    methods: {
        onClick() {
            alert('哈哈哈')
        }
    }
}

var seg = new Vue({
    el:'#seg',
    components:{
        haha:haha_component
    }
})



