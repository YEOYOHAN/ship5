"use strict";
var auth = auth || {}
auth = (()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.'
    let _, js, auth_vue_js, brd_js, router_js
    let init = ()=>{
        _ = $.ctx()
        js = $.js()
        auth_vue_js = js+'/vue/auth_vue.js'
        brd_js = js+'/brd/brd.js'
        router_js = js+'/cmm/router.js'
    }
    function onCreate(){
        init()
        $.when(
        	$.getScript(auth_vue_js),
        	$.getScript(router_js)
        )
        .done(()=>{
        	setContentView()
    		$('#a_go_join').click(e=>{
         		e.preventDefault()
         		$('head').html(auth_vue.join_head())
		        $('body').html(auth_vue.join_body())
		        $('#uid').keyup(()=>{
		        	if($('#uid').val().length > 2){
		        		$.ajax({
		            		url : _+'/users/'+$('#uid').val() +'/exist',
		            		//type : 'GET',GET방식은 디폴트로 생략가능
		            		contentType : 'application/json',
		            		success : d =>{
		            			if(d.msg==='SUCCESS'){
		            				$('#dupl_check').val('사용가능한 아이디입니다.').css('color','blue')
		            			}else{
		            				$('#dupl_check').val('중복된 아이디입니다.').css('color','red')
		            			}
		            		},
		            		error : e =>{
		                        alert('existId ajxa실패')
		                      }
		            	})
		            }
		        });
		        $('<button>',{
		            text : '회원가입',
		            href : '#',
		            click : e=>{
		            	e.preventDefault()
		            		join()
		            }
		        })
		        .addClass('btn btn-primary btn-lg btn-block')
		        .appendTo('#btn_join')
    		})
        }).fail(()=>{alert(WHEN_ERR)})
    }
    function setContentView(){
    	$('head').html(auth_vue.login_head({css: $.css(), img: $.img()}))
        $('body').addClass('text-center')
        .html(auth_vue.login_body({css: $.css(), img: $.img()}))
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
		        	if(d.msg === 'SUCCESS'){
		            	$('head').html(auth_vue.login_head({css: $.css(), img: $.img()}))
		                $('body').addClass('text-center')
		                .html(auth_vue.login_body({css: $.css(), img: $.img()}))
		        		login()
		        }else{
		        			alert('회원가입 실패')
		        }
		        },
		        error : e=>{
		        	alert('join AJAX 실패');
		        	}
            })
    }
    let login =()=>{
            $('<button>',{
              type : "submit",
              text : "로그인",
              click : e => {
                e.preventDefault()
                $.ajax({
                    url : _+'/users/'+$('#uid').val(),
                    type : 'POST',
                    dataType : 'json',
                    data : JSON.stringify({uid : $('#uid').val(), upw : $('#upw').val()}),
                    contentType : 'application/json',
                    success : d =>{
                    	$.when(
                    		$.getScript(brd_js),
                    		$.getScript(router_js,()=>{
                    			$.extend(new User(d))
                    		})
                    	)
                    	.done(()=>{
                    		brd.onCreate()                    		
                    	}
                    	)
                    	.fail(()=>{
                    		alert('실패')
                    	})
                   
                    	alert(d.uname+',님환영합니다 ')
                  
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
    /**let existId =()=> {
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
    }*/
    return {onCreate, join, login}
})();