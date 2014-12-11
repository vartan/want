
function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}

var fixImages = function() {
    $(".lazy").each(function(index, element) {
    	if(elementInViewport(element)) {
    		var $elem = $(element);
    		$elem.removeClass("lazy");
    		$elem.html("<img src=\""+$elem.attr("src")+"\"/>");
    	}
    })
}
$(window).on("load resize scroll", fixImages);
document.body.onload = function() {
	$.getJSON("products.json", function(products) {
		var container = $(".container");
		for(var i in products) {
			var product = products[i];
			var url = "http://www.amazon.com/dp/"+product.ASIN+"/?tag=vartannet46ne-20"
			container.append("<tr><td><a href=\""+url+"\" target=\"_blank\"><div class=\"lazy\" src=\"http://images.amazon.com/images/P/"+product.ASIN+".01._SCMZZZZZZZ_.jpg\"/></div></a></td><td><a href=\""+url+"\" target=\"_blank\">"+product.title+"</a></td><td>"+product.price+"</td></tr>")
		}
		fixImages();
	});
} 