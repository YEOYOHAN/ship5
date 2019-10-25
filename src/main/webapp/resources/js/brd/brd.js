"use strict";
var brd = brd || {};
brd = (()=>{
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.'
        let _,js,brd_vue_js,router_js, sibal;
    
    let init =()=>{
        _=$.ctx()
        js=$.js()
        brd_vue_js=js+'/vue/brd_vue.js'
        router_js = js+'/cmm/router.js'
        sibal = $.uname()
    }
    let onCreate=()=>{
        init()
        $.when(
        	$.getScript(brd_vue_js),
        	$.getScript(router_js)
        )
        .done(()=>{
        	setContentView()
	        	$('<a>',{
	           href : '#',
	           click : e=>{
	               e.preventDefault()
	               write()
	           },
	           text : '글쓰기'
	       })
	       .addClass('nav-link')
	       .appendTo('#go_write')
    })
    }
    let setContentView =()=>{
        $('head').html(brd_vue.brd_head({css: $.css(), img: $.img()}))
        $('body').addClass('text-center')
        .html(brd_vue.brd_body({ctx: '/web',css: $.css(), img: $.img()}))
        $('#recent_updates .media').remove()
        $('#recent_updates .d-block').remove()
        $('#recent_updates').append('<h1>등록된 글이 없습니다.</h1>')
    }
    let write=()=> {
    	alert('한번 써봐!')
    	$('#recent_updates').html(brd_vue.brd_write(sibal))
    	$('#suggestions').remove()
    	$('#username1').val(sibal)
	
    }
    return{onCreate}
})();