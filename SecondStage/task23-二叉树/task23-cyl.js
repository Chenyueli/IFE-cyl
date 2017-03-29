function searchDiv() {
	var div = [];
	//前序遍历
	function preOrder(node) {
		if(!(node == null)) {
			div.push(node);
			preOrder(node.firstElementChild);
			preOrder(node.nextElementSibling);
		}
	}

	preOrder(document.body);
	return div;
}
var div = searchDiv();
//alert(div.length);

//遍历验证
//var i = 0;
//var timer = setInterval(function() {
//	if(i < div.length) {
//		div[i].style.border = "1px solid red";
//		i++;
//	} else {
//		clearInterval(timer);
//	}
//}, 500);

var input = document.getElementById("input");
input.addEventListener("keyup", searchHandler, false);

function searchHandler(e) {
	if(e.keyCode === 13) {
		for(var i = 0, len = div.length; i < len; i++) {
			div[i].style.color = "black";
		}
		var text = input.value.trim();
//		alert(text);
		for(var i = 0, len = div.length; i < len; i++) {
			if(text == div[i].textContent) {
				div[i].style.color = "red";
				break;
			}
		}
		input.value = [];
	}

}