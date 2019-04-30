let panelCon = {
    template:'#panel',
    data() {
        return {
            title:'111'
        }
    }
}

new Vue({
    el:'#app',
    data:{
    },
    components:{
        'panel':panelCon
    }
})