"use strict";
var auth = auth || {}
auth = (()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.'
    let _, js, auth_vue_js, brd_vue_js
    let init = ()=>{
        _ = $.ctx()
        js = $.js()
        auth_vue_js = js+'/vue/auth_vue.js'
        brd_vue_js = js+'/vue/brd_vue.js'
    }
    function onCreate(){
        init()
        $.getScript(auth_vue_js).done(()=>{
        	setContentView()
    		$('#a_go_join').click(e=>{
         		e.preventDefault()
         		$('head').html(auth_vue.join_head())
		        $('body').html(auth_vue.join_body())
		        $('<button>',{
		            text : '회원가입',
		            href : '#',
		            click : e=>{
		            	e.preventDefault()
		            		existId()
		            		join()
		            }
		        })
		        .addClass('btn btn-primary btn-lg btn-block')
		        .appendTo('#btn_join')
    		})
        }).fail(()=>{alert(WHEN_ERR)})
    }
    function setContentView(){
    	 login()

    }
    let join =()=>{
        let data = {uid : $('#uid').val(),
                upw : $('#upw').val(),
                uname : $('#uname').val()}
        		alert('전송아이디 :'+data.uid)
        		$.ajax({
        		url : _+'/users/',
              	type : 'POST',
              	dataType : 'json',
		        data : JSON.stringify(data),
		        contentType : 'application/json',
		        success : d =>{
		        	alert('AJAX 성공 아이디: '+d.msg)
		        	if(d.msg === 'SUCCESS')
		        		login()
		        		else
		        			alert('회원가입 실패')
		        },
		        error : e=>{
		        	alert('join AJAX 실패');
		        	}
            })
    }
    let login =()=>{
    	let x = {css: $.css(), img: $.img()}
        	$('head').html(auth_vue.login_head(x))
            $('body').addClass('text-center')
            .html(auth_vue.login_body(x))
        
            $('<button>',{
              type : "submit",
              text : "Sign in",
              click : e => {
                e.preventDefault()
                let data = {uid : $('#uid').val(), upw : $('#upw').val()}
                $.ajax({
                    url : _+'/users/'+$('#uid').val(),
                    type : 'POST',
                    dataType : 'json',
                    data : JSON.stringify(data),
                    contentType : 'application/json',
                    success : d =>{
                    	alert(d.uname+',님환영합니다 ')
                    	mypage()
                  
                },
                error : e =>{
                  alert('login ajxa실패')
                }
                
                  })
                
              }
            })
        .addClass("btn btn-lg btn-primary btn-block")
        .appendTo('#btn_login')
    }
    let existId =()=> {
    	$.ajax({
    		url : _+'/users/'+$('#uid').val() +'/exist',
    		type : 'GET',
    		contentType : 'application/json',
    		success : d =>{
    			if(d.msg==='SUCCESS'){
    				alert('없는 아이디입니다.'+d.msg)
    				return true;
    			}else{
    				alert('중복된 아이디입니다.')
    				return false;
    			}
    		},
    		error : e =>{
                alert('existId ajxa실패')
              }
    	})
    }
    let mypage =()=>{
    	$('head').html(brd_vue.brd_head())
		$('body').html(brd_vue.brd_body())
    }
    return {onCreate, join, login, mypage}
})();