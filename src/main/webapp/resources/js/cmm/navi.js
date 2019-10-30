var navi = navi || {}
navi = (()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.'
		let _, js, css, img, auth_vue_js, brd_js, navi_vue_js
	let init =x=>{
		_ = x._
        js = x.js
        css = x.css
        img = x.img
        brd_js = js+'/brd/brd.js'
	}
	let onCreate =x=> {
		init(x)
		setContentView()
	}
	let setContentView =()=> {
		$('<a>',{
        	href : '#',
	        text : '글쓰기'
        })
        .addClass('nav-link')
        .appendTo('#menu_write')
        .click( e=>{
        	e.preventDefault()
        	$.getScript(brd_js, ()=>{
        		brd.write()
        	})
        })
        $('<a>',{
        	href : '#',
	        text : '로그아웃'
        })
        .addClass('nav-link')
        .appendTo('#menu_logout')
        .click( e=>{
        	e.preventDefault()
        	deletCookie()
        	app.run(_)
        })
	}
	return {onCreate}
})()