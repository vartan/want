document.body.onload = function() {
	$.getJSON("products.json", function(products) {
		var container = $(".container");
		for(var i in products) {
			var product = products[i];
			container.append("<tr><td><a href=\"http://www.amazon.com/dp/"+product.ASIN+"\"><img src=\"http://images.amazon.com/images/P/"+product.ASIN+".01._SCMZZZZZZZ_.jpg\"/></a></td><td><a href=\"http://www.amazon.com/dp/"+product.ASIN+"\">"+product.title+"</a></td><td>"+product.price+"</td></tr>")
		}
		
	});
} 