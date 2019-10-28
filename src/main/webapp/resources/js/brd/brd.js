"use strict";
var brd = brd || {};
brd = (()=>{
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.'
        let _,js,brd_vue_js,router_js, uid;
    
    let init =()=>{
        _=$.ctx()
        js=$.js()
        brd_vue_js=js+'/vue/brd_vue.js'
        router_js = js+'/cmm/router.js'
        uid = $.uid()

    }
    let onCreate=()=>{
        init()
        $.when(
        	$.getScript(brd_vue_js),
        	$.getScript(router_js)
        )
        .done(()=>{
        	setContentView()
        	navigation()
	        	
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
    let write =()=>{
        alert('글쓰기로이동')
        $('#recent_updates').html(brd_vue.brd_write())
        $('#write_form input[name="writer"]').val(uid)
        $('#suggestions').remove()
        $('<input>', {
            style :"float:right;width:100px;margin-right:10px",
            value : "취소"
        })
        .addClass("btn btn-danger")
       .appendTo('#write_form')
       .click(()=>{
       })
       $('<input>', {
           type : "submit",
           style : "float:right;width:100px;margin-right:10px",
           value : "전송"
       })
       .addClass("btn btn-primary")
       .appendTo('#write_form')
       .click(e=>{
    	   e.preventDefault()
    	   let json = {
    			   uid : $('#write_form input[name="writer"]').val(),
    			   title : $('#write_form input[name="title"]').val(),
    			   content : $('#write_form textarea[name="content"]').val()
    	   }
    	   alert('아이디'+json.uid)
           $.ajax({
               url : _+'/articles/',
               type : 'POST',
               data : JSON.stringify(json),
               dataType : 'json',
               contentType : 'application/json',
               success : d =>{
	               	$('#recent_updates').html('<h1>목록 불러오기</h1>')
               },
            	   error : e =>{
                       alert('글쓰기 실패')
                       }
           })
       })
    }
    let navigation =()=>{
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
    }
    return{onCreate}
})();