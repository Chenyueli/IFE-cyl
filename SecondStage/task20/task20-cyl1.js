           document.getElementById('input').focus();
			var dis = document.getElementById('display');
			/**
			 * 添加删除绑定函数
			 * @param {Object} dir： 进入方向
			 */
			function addDelHandler(e) {
				var id = e.target.id;
				if(id === "left-in" | id === "right-in") {
					var text = document.getElementById('input').value.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
//					alert(text);
					for(var i=text.length -1 ;i>=0;i--) {
						var span = document.createElement('span');
						var a = document.createTextNode(text[i]);
						span.appendChild(a);
						span.className = "show";
						if(id === "left-in") {
						dis.insertBefore(span, dis.childNodes[0]);
					} else {
						//						dis.insertBefore(span);
						dis.appendChild(span);
					}
					}
				} else {
					if(dis.childElementCount !== 0) {
						if(id === "left-out") {
							removeElement(dis.firstChild);
						} else {
							removeElement(dis.lastChild);
						}
					} else {
						alert('no more elements!')
					}
				}
			}
			/**
			 * 删除元素节点函数
			 * @param {Object} _element 删除的节点
			 */
			function removeElement(_element) {
				var _parentElement = _element.parentNode;
				if(_parentElement) {
					_parentElement.removeChild(_element);
				}
			}
			/**
			 * 查询匹配处理函数
			 */
			function searchHandler() {
//				var spans = dis.children;
//				alert(spans.length);
//				for(var child in spans){
//					child.className = 'show';
//					alert(child.getAttribute("class"));
//				}
				var child = dis.firstElementChild;
				for(i = 0; i < dis.childElementCount; i++) {
//					alert(child.getAttribute("class"));
					child.className = "show";
//					child.setAttribute("class","show");
					child = child.nextElementSibling;
				}
				
				var inputText = document.getElementById('searchInput').value;
				//				alert('input is:' + inputText);
				var text;
				//遍历查询
				var i,child = dis.firstElementChild;
				console.log(dis.innerHTML);
				var re3 = new RegExp(inputText, "g");
				for(i = 0; i < dis.childElementCount; i++) {
					text = child.textContent;
					var a = text.match(re3)
//					alert(a);
					if(a != null) {
//						alert("hi");
//					alert(child.getAttribute("class"));
						child.classList.add("yellow");
//					alert(child.getAttribute("class"));
						
						//alert(child.className);
					}
					//alert(text);
					child = child.nextElementSibling;
				}
			}

			var btn = document.getElementById('btn');
			btn.addEventListener('click', addDelHandler, false);
			var btnSearch = document.getElementById('search');
			btnSearch.addEventListener('click', searchHandler, false);

			//			AddEventHandler(btn, 'click', eventHandler)
			//
			//			function AddEventHandler(element, event, eventHandler) {
			//				if(element.attachEvent) {
			//					element.attachEvent(event, eventHandler);
			//				} else {
			//					element.addEventListener(event, eventHandler, false);
			//				}
			//			}