
//事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
	try {
		element.addEventListener(event, listener, false);
	} catch(e) {
		try {
			element.attachEvent("on" + event, listener);
		} catch(e) {
			element["on" + event] = listener;
		}
	}
}

//输入元素id
var tagBox = document.getElementById("tag_box");
var tagInput = document.getElementById("tag_input");
var tagList = document.getElementById("tag_list");
var hobbyInput = document.getElementById("hobby_input");
var hobbyBtn = document.getElementById('hobbyConfirm_btn');
var hobbyList = document.getElementById("hobby_list");

//聚焦
tagInput.focus();

//id绑定事件
addEvent(tagInput, 'keyup', showTag);

addEvent(hobbyBtn, 'click', showHobby);

addEvent(tagList, "click", function(e) {
	//	alert(e.target.tagName);
	if(e.target.tagName.toLowerCase() === "span") {
		removeElement(e.target);
	}
});

addEvent(tagList, "mouseover", function(e) {
	if(e.target.tagName.toLowerCase() === "span") {
		e.target.innerHTML = "删除" + e.target.innerHTML;
	}
});

addEvent(tagList, "mouseout", function(e) {
	if(e.target.tagName.toLowerCase() === "span") {
		e.target.innerHTML = e.target.innerHTML.slice(2);
	}
});

addEvent(hobbyList, "mouseover", function(e) {
	if(e.target.tagName.toLowerCase() === "span") {
		e.target.innerHTML = "删除" + e.target.innerHTML;
	}
});
addEvent(hobbyList, "mouseout", function(e) {
	if(e.target.tagName.toLowerCase() === "span") {
		e.target.innerHTML = e.target.innerHTML.slice(2);
	}
});
addEvent(hobbyList, "click", function(e) {
	//	alert(e.target.tagName);
	if(e.target.tagName.toLowerCase() === "span") {
		removeElement(e.target);
	}
});

//功能函数 ——删除元素节点
function removeElement(_element) {
	var _parentElement = _element.parentNode;
	if(_parentElement) {
		_parentElement.removeChild(_element);
	}
}

//功能函数——查重
function checkDuplicate(list, text) {
	var child = list.firstElementChild;
	for(i = 0; i < list.childElementCount; i++) {
		//		alert(child.innerHTML)
		if(child.innerHTML.indexOf(text) != -1) {
			return false;
		}
		child = child.nextElementSibling;
	}
	return true;
}

//tag显示响应函数
function showTag(e) {
	//	alert("ehi");
	if(/[,. ，、\s\n]+/.test(tagInput.value) || e.keyCode === 13) {
		var text = tagInput.value.split(/[,. ，、\s\n]+/);
		if(text[0] !== '') {
			for(var i = 0; i <= 0; i++) {
				if(checkDuplicate(tagList, text[i])) {
					var span = document.createElement('span');
					var a = document.createTextNode(text[i]);
					span.appendChild(a);
					span.className = "show";
					tagList.appendChild(span);
				}
				//		}
				tagInput.value = "";
			}
		}
	}
}

//hobby按钮确认显示响应函数
function showHobby() {
	//	alert("heihie");
	var text = hobbyInput.value.trim().split(/[,.;，、；\s\n]+/);
	//	alert(text);
	for(var i = 0, len = text.length; i < len; i++) {
		if(checkDuplicate(hobbyList, text[i]) ) {
			var span = document.createElement('span');
			var a = document.createTextNode(text[i]);
			span.appendChild(a);
			span.className = "show";
			hobbyList.appendChild(span);
		}
		//		}
		hobbyInput.value = "";
	}
}