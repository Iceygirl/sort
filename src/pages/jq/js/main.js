// DOM加载完成之后实现：$(document).ready(function() { }) 等价于 $(function() { })

jQuery(function($){
    $('.box').css('background','red')
    $('.box').hide()
    $('.box').show()
    $('<div>哈哈哈</div>').appendTo('body')
    $('<p>', {
        class:'test',
        text:'你好呀，我现在写会基本的jq基础',
        click:function() {
            $(this).toggleClass('test')
        }
    }).appendTo('body')

    $('.lists .item').each(function(i,ele) {
        if(i === 0) 
            $(ele).html('aaa')
        else 
            $(ele).html('bbb')
        $(ele).css('listStyle','none')
    })

    
    console.log($('.lists .item').length)
})