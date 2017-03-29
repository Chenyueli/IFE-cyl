var createItem = (function() {

	var _obj = function(input, output, button) {
		//私有变量、私有属性
		var count = 0; //初始化实例标签数量为0个；
		//特权方法
		this.getCount = function() {
			return count;
		}
		this.setCount = function(value) {
				count = value;
			}
			//公有属性
		this.input = document.getElementById(input);
		this.output = document.getElementById(output);
		this.button = document.getElementById(button);

		//公有方法
		this.button ? this.init('hobby') : this.init('tag');
	}

	//构造原型方法：共享属性和方法
	_obj.prototype = {
		//功能函数——查重
		checkDuplicate: function(text) {
			var child = this.output.firstElementChild;
			for(i = 0; i < this.output.childElementCount; i++) {
				//alert(child.innerHTML)
				if(child.innerHTML.indexOf(text) != -1) {
					return false;
				}
				child = child.nextElementSibling;
			}
			return true;
		}, //逗号很重要

		init: function(type) {
			//			alert("init");
			var self = this;
			this.addEvent(this.output, "click", function(e) {
				//	alert(e.target.tagName);
				if(e.target.tagName.toLowerCase() === "span") {
					self._removeElement(e.target);
				}
			});

			this.addEvent(this.output, "mouseover", function(e) {
				if(e.target.tagName.toLowerCase() === "span") {
					e.target.innerHTML = "删除" + e.target.innerHTML;
				}
			});

			this.addEvent(this.output, "mouseout", function(e) {
				if(e.target.tagName.toLowerCase() === "span") {
					e.target.innerHTML = e.target.innerHTML.slice(2);
				}
			});

			switch(type) {
				case "tag":
					//					alert("tag");
					//					alert(this.input);
					this.addEvent(this.input, 'keyup', function(e) {
						//alert(self.input);
						if(/[,. ，、\s\n]+/.test(self.input.value) || e.keyCode === 13) {
							var text = self.input.value.split(/[,. ，、\s\n]+/);
							if(text[0] !== '') {
								for(var i = 0; i <= 0; i++) {
									if(self.checkDuplicate(text[i])) {
										var span = document.createElement('span');
										var a = document.createTextNode(text[i]);
										span.appendChild(a);
										span.className = "show";
										self.output.appendChild(span);

										self.setCount(self.getCount() + 1);
										//										alert(self.getCount());
										if(self.getCount() > 10) {
											self.output.firstElementChild.remove();
										}
									}
									//		}
									self.input.value = "";
								}
							}
						}
					});
					break;
				case "hobby":
					//					alert("hobby");
					this.addEvent(self.button, 'click', function(e) {
						//						alert(this);
						//						alert(self.input);
						var text = self.input.value.trim().split(/[,.;，、；\s\n]+/);
						//	alert(text);
						for(var i = 0, len = text.length; i < len; i++) {
							if(self.checkDuplicate(text[i])) {
								var span = document.createElement('span');
								var a = document.createTextNode(text[i]);
								span.appendChild(a);
								span.className = "show";
								self.output.appendChild(span);

								self.setCount(self.getCount() + 1);
								//								alert(self.getCount());
								if(self.getCount() > 10) {
									self.output.firstElementChild.remove();
								}
							}
						}
						self.input.value = "";
					});
					break;
			}
		},
		
		//功能函数 ——删除元素节点
		_removeElement: function(_element) {
			var _parentElement = _element.parentNode;
			if(_parentElement) {
				_parentElement.removeChild(_element);
			}
		},

		//事件绑定函数，兼容浏览器差异
		addEvent: function(element, event, listener) {
			try {
				element.addEventListener(event, listener, false);
			} catch(e) {
				try {
					element.attachEvent("on" + event, listener);
				} catch(e) {
					//					element["on" + event] = listener;
				}
			}
		},

	};

	return _obj;
})();

//聚焦
document.getElementById("tag_input").focus();

//实例化
var tag = new createItem("tag_input", "tag_list");
var hobby = new createItem("hobby_input", "hobby_list", "hobbyConfirm_btn");