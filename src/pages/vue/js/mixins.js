var base = {
    data() {
        return {
             isShow:false
        } 
     },
     methods:{ 
        show() {
            this.isShow = true
        },
        hide() {
            this.isShow = false
        },
        showOrHide() {
            this.isShow = ! this.isShow
        }
     }
}

// mixins混合模式
let tipsComponent = {
    template:`
    <div>
        <button @click="showOrHide">显示</button>
        <div v-if="isShow">
            <h4>title</h4>
            <div>11111111111111111111111111111111</div>
        </div>
    </div>
    `,
    mixins:[base],
    data() {
        return {
             isShow:true
        } 
     },
}


let mouseComponent = {
    template:`
    <div>
        <p @mouseover="show" @mouseout="hide">显示</p>
        <p v-if="isShow">111</p>   
    </div>
    `,
    mixins:[base]
}

new Vue({
    el:'#app',
    components: {
        'tip':tipsComponent,
        'mouse':mouseComponent
    }
})