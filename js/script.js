document.body.onload = function() {
	$.getJSON("products.json", function(products) {
		var container = $(".container");
		for(var i in products) {
			var product = products[i];
			var url = "http://www.amazon.com/dp/"+product.ASIN+"/?tag=vartannet46ne-20"
			container.append("<tr><td><a href=\""+url+"\"><img src=\"http://images.amazon.com/images/P/"+product.ASIN+".01._SCMZZZZZZZ_.jpg\"/></a></td><td><a href=\""+url+"\">"+product.title+"</a></td><td>"+product.price+"</td></tr>")
		}
		
	});
} 