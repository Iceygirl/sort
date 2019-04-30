// 配置组件：局部组件
var likeComponent = {
    // template:'#likeHtml',
    template:`<Button :class="{red:flag}" @click="toLike">
                👍{{likeCount}}
              </Button>`,
    data() {
        return {
            likeCount:10,
            flag:false
        }
    },
    methods:{
        // 点赞
        toLike() {
            if(!this.flag)
                this.likeCount++
            else
                this.likeCount--
            this.flag = !this.flag
        }
    }
}

new Vue({
    el:'#app',
    components:{
        like:likeComponent
    }
})