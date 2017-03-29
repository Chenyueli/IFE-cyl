init();

function init() {
	var wrap = document.getElementById("wrap-plan");
	var items = document.getElementsByClassName("items");
	addEvent(wrap, "click", function(e) {

		for(var i = 0, len = items.length; i < len; i++) {
			items[i].classList.remove("selected");
		}
//		alert(e.target.className);

		switch(e.target.className) {
			case "add-button":
				//				var text = prompt("请输入要添加的节点");
				var text = e.target.previousElementSibling.value.trim();
				if(text !== null) {
					if(text === ""){
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
				//					e.target.parentElement.classList.toggle("folder");
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
	})
};

function addEvent(element, type, handler) {
	if(element.attachEvent) {
		element.attachEvent("on" + type, handler);
	} else if(element.addEventListener) {
		element.addEventListener(type, handler, false);
	} else {
		element["on" + type] = handler;
	}
}