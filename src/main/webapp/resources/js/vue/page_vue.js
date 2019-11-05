"use strict"
var page_vue = page_vue || {}
page_vue ={
	page_body: ()=>{
		return '<div class="container">'+
		'  <h2>Pagination</h2>'+
		'  <ul id="pagination" class="pagination justify-content:="" center"="" style="place-content: center">'+
		'    <li class="page-item"><a class="page-link" href="#">Previous</a></li>'+
		'    <li class="page-item"><a class="page-link" href="#">1</a></li>'+
		'    <li class="page-item"><a class="page-link" href="#">2</a></li>'+
		'    <li class="page-item"><a class="page-link" href="#">3</a></li>'+
		'    <li class="page-item"><a class="page-link" href="#">Next</a></li>'+
		'  </ul>'+
		'</div>'
	}
}