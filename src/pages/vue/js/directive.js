// 自定义指令
Vue.directive('focs',(el,binding)=>{
    var val = binding.value
    var position = binding.modifiers
    console.log(binding)

    if(val) {
        el.style.background = 'red'
        el.style.border = 'none'
    } else {
        el.style.border = ''
        el.style.background = ''
    }
})

new Vue({
    el:'#app',
    data:{
        isFocs:false
    }
})