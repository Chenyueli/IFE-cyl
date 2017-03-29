var input = document.getElementById("input");
var wrap = document.getElementById("wrap-plan");

/**
 * @前序搜索函数  
 * @调用格式：var div = searchDiv();
 * @param 返回前序搜索元素结果数组；
 */
function searchDiv() {
	var eleOrder = [];
	//前序遍历
	function preOrder(node) {
		if(!(node == null)) {
			eleOrder.push(node);
			preOrder(node.firstElementChild);
			preOrder(node.nextElementSibling);
		}
	}
	preOrder(document.body);
	return eleOrder;
}

//遍历验证
function searchDivShow(eleOrder) {
	var i = 0;
	var timer = setInterval(function() {
		if(i < eleOrder.length) {
			eleOrder[i].style.border = "1px solid red";
			i++;
		} else {
			clearInterval(timer);
		}
	}, 500);
}

function addDelHandler(e) {
	var items = document.getElementsByClassName("items");
	for(var i = 0, len = items.length; i < len; i++) {
		items[i].classList.remove("selected");
	}
	//				alert(e.target.className);
	switch(e.target.className) {
		case "add-button":
			//				var text = prompt("请输入要添加的节点");
			var text = e.target.previousElementSibling.value.trim();
			if(text !== null) {
				if(text === "") {
					alert("请输入添加项目");
					break;
				}
				var newDiv = document.createElement("div");
				newDiv.className = "items";
				
				var newSpan = document.createElement("span");
				newSpan.className = "fold-item";
				var newText = document.createTextNode("*");
				newSpan.appendChild(newText);
				newDiv.appendChild(newSpan);

				var newSpan = document.createElement("span");
				newSpan.className = "content";
				var newText = document.createTextNode(text);
				newSpan.appendChild(newText);
				newDiv.appendChild(newSpan);

				var newSpan = document.createElement("input");
				newSpan.className = "input-box";
				newDiv.appendChild(newSpan);

				var newSpan = document.createElement("span");
				newSpan.className = "add-button";
				var newText = document.createTextNode("+");
				newSpan.appendChild(newText);
				newDiv.appendChild(newSpan);

				var newSpan = document.createElement("span");
				newSpan.className = "del-button";
				var newText = document.createTextNode("-");
				newSpan.appendChild(newText);
				newDiv.appendChild(newSpan);

				e.target.parentElement.appendChild(newDiv);
			}
			break;
		case "fold-item":
			var itemfolder = e.target.parentElement.lastElementChild;
			while(itemfolder.nodeName.toLocaleLowerCase() === "div") {
				itemfolder.classList.toggle("folder");
				itemfolder = itemfolder.previousElementSibling;
			}
			break;
		case "del-button":
			//				if(confirm("您确定要删除吗？")) {
			e.target.parentElement.innerHTML = "";
			//				}
			break;

		case "input-box":
			break;
			
		case "items":
			//				alert(e.target.lastElementChild.nodeName)
			if(e.target.lastElementChild.nodeName.toLocaleLowerCase() === "span") {
				e.target.classList.add("selected");
			}
			break;

		case "content":
			if(e.target.parentElement.lastElementChild.nodeName.toLocaleLowerCase() === "span") {
				e.target.parentElement.classList.add("selected");
			}
	}
}

function searchHandler(e) {
	if(e.keyCode === 13) {
		var div = searchDiv();
		//alert(div.length);

		for(var i = 0, len = div.length; i < len; i++) {
			div[i].style.color = "black";
		}
		var text = input.value.trim();
		//		alert(text);
		for(var i = 0, len = div.length; i < len; i++) {
			if(text == div[i].textContent) {
				div[i].style.color = "red";
				var child = div[i].parentElement.parentElement.lastElementChild;
				alert(child.nodeName);
				while(child !== null && child.nodeName.toLocaleLowerCase() === "div"){
//					
					child.classList.remove("folder");
					child = child.previousElementSibling;
				}
				break;
			}
		}
		input.value = [];
	}
}

function addEvent(element, type, handler) {
	if(element.attachEvent) {
		element.attachEvent("on" + type, handler);
	} else if(element.addEventListener) {
		element.addEventListener(type, handler, false);
	} else {
		element["on" + type] = handler;
	}
}

function init() {
	addEvent(input, "keyup", searchHandler);
	addEvent(wrap, "click", addDelHandler);
}

init();