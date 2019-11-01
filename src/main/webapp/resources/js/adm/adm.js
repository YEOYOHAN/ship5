var adm = adm || {}
adm = (()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.'
	let _,js,css,img,navi_vue_js,navi_ja
	let init =()=>{
		_ = $.ctx()
        js = $.js()
        css = $.css()
        img = $.img()
        navi_vue_js = js+'/vue/navi_vue.js'
        navi_js = js+'/cmm/navi.js'
		
	}
	let onCreate =()=>{
		alert('환영합니다.')
		init()
		$.when(
			$.getScript(navi_js),
			$.getScript(navi_vue_js)
		).done(()=>{
			setContentView()
		}).fail(()=>{
			alert(WHEN_ERR)
		})

	}
	let setContentView =()=>{
		$('body').empty()
		$(navi_vue.nav())
			.appendTo('body')
		$('<table id="tab"><tr></tr></table>')
		  	.css({border: '1px solid #dc3545', width: '80%', height: '80%', margin: '0 auto'})
		  	.appendTo('body')
		  let arr1 =[{id:'left',width:'20%'},
			  		{id:'right',width:'80%'}]
		$.each(arr1,(i,j)=>{
			$('<td id="'+j.id+'"></td>')
				.css({border: '2px solid #dc3545', width: j.width, 'vertical-align': 'top'})
				.appendTo('#tab tr')
		})
		  let arr = [{txt:'웹크롤링',name:'web_crawl'},
			  		{txt:'야스오충',name:'cust_yasuo'},
			  		{txt:'리신충',name:'item_leesin'},
			  		{txt:'티모충',name:'item_teemo'},
			  		{txt:'마이충',name:'item_lee'},
			  		{txt:'베인충',name:'item_vayne'}]
		$.each(arr,(i,j)=>{
			$('<div name="'+j.name+'">'+j.txt+'</div>')
				.css({border: '2px solid #007bff', margin:'0 auto', 'line-height': '50px'})
				.appendTo('#left')
				.click(function(){
					$(this).addClass('active')
					$(this).siblings().removeClass('active')
					switch($(this).attr('name')) {
					case 'web_crawl':
						webCrawl()
						break;
					case 'cust_yasuo':
					
						break;
					case 'item_leesin':
						
						break;
					case 'item_teemo':
						
						break;
					case 'item_lee':
						
						break;
					case 'item_vayne':
						
						break;
					default:
						break;
					}
				})
			})
			navi.onCreate()
		}
	let webCrawl=()=>{
		$('#right').empty()
		$('</br></br></br></br></br><h2>Web Crawling</h2></br></br></br></br></br></br></br>'+
				'<form id="crawl_form" class="form-inline my-2 my-lg-0">'+
				'<select name="site" size="1">'+
				'</select>'+
		        '<input class="form-control mr-sm-2" type="text" placeholder="insert URL for crawling" aria-label="Search">'+
				'</form>')
				.appendTo('#right')
		$('#crawl_form input[class="form-control mr-sm-2"]')
			.css({width:'80%'})
		$.each([{sub:'naver.com'},{sub:'daum.net'},{sub:'google.com'},{sub:'youtube.com'}],(i,j)=>{
			$('<option value='+j.sub+'>'+j.sub+'</option>').appendTo('#crawl_form select')
		})
		$('<button class="btn btn-secondary my-2 my-sm-0" type="submit">go crawl</button>').appendTo('#crawl_form')
			.click(e=>{
				e.preventDefault()
				let arr = [$('#crawl_form select[name="site"]').val(),
						   $('#crawl_form input[type="text"]').val()]
				if(!$.fn.nullChecker(arr)){
					$.getJSON(_+'/txcons/crawling/'+arr[0]+'/'+arr[1],d=>{
						alert(d.msg)
					})
				}
			})
		}
	return {onCreate}
})()