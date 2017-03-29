/*飞船*/
//组合使用构造函数和原型模式

//飞行状态常量
var STOP = 0;
var START = 1;

function SpaceShip(orbit, rate) {
	this.orbit = orbit;
	this.rate = rate;
	this.status = STOP;
	this.energy = 100;
	this.angle = 0;
};

SpaceShip.prototype = {
	constructor: SpaceShip,
	getOrbit: function() {
		return this.orbit;
	},

	//动力系统
	//开始飞行
	start: function(rate) {
		console.log(this);
		this.status = START;
		var that = this;
		var ship = document.getElementById("orbit-" + that.orbit);
		var timer = setInterval(function() {
			//			console.log(that);
			if(that.energy >= 0 && that.status == START) {
				that.angle += 1;
				ship.style.transform = "rotate(" + that.angle + "deg)";
				that.energy -= 2 / 4;
				console.log(that.energy);
			} else {
				clearInterval(timer);
				that.status == STOP;
			}
		}, 50);
	},
	//停止飞行
	stop: function() {
		this.status = STOP;
	},
	//能源系统
	//增加能源
	add: function() {
		while(this.energy < 100) {
			if(this.status == STOP) {
				this.energy += 10;
				//等待时间
			}

		}
	},
	//消耗能源
	consume: function(rate) {

	},

	//信号识别系统
	//检测接收行星上的信号
	getMessage: function(message) {
		if(message.id == this.orbit) {
			switch(cmd) {
				case "start":
					this.drive.start();
					break;
				case "stop":
					break;
				case "destory":
					break;
			}
		}
	},

	//自曝系统
	//立即毁灭
	setDestroyFlag: function() {

	}

};

var Constructor = {
	//轨道飞船状态
	//	noteBook: [{"id1":"none"}, {"id2":"flying"}, {"id2":"stop"}, {"id2":"none"}],
	noteBook: ["stop", "stop", "stop", "stop"],
	noteBooks: {
		//飞船列表
		spaceShipList: [],
	},
	createSpaceShip: function(oribt) {
		//		if(!this.noteBook[oribt]) {
		this.message.id = oribt;
		this.message.command = "create";
		console.log(this.message.id);
		//	s.getMessage(this.message);

		//		} else {
		//			console.log("该轨道已存在一只飞船");
		//		}
	},
	destroySpaceShip: function(oribt) {
		if(this.noteBook[oribt]) {
			this.message[id] = oribt;
			this.message[command] = "destory";
			SpaceShip.getMessage(message);
			noteBook[oribt] = true;
		} else {
			console.log("该轨道不存在飞船");
		}
	},
	sendMessage: function(cmd) {
		var isValidCmd = false;
		var orbit = cmd.id;
		var obtStatus = this.noteBook[orbit];
		switch(cmd.command) {
			case "create":
				if(orbit > 4) {
					console.log("Error:轨道已满");
				} else {
					isValidCmd = true;
					this.noteBooks.spaceShipList[oribt - 1] = new SpaceShip();
				}
				//创建飞船
				new SpaceShip(orbit, 10);
				break;
			case "start":
				if(obtStatus == "stop") {
					isValidCmd = true;
				} else {
					console.log("Error:飞船正在运行");
				}
				break;
			case "stop":
				if(obtStatus == "flying") {
					isValidCmd = true;
				} else if(obtStatus == "stop") {
					console.log("Error:飞船已经停止飞行");
				} else if(obtStatus == "none") {
					console.log("Error:飞船不存在");
				}
				break;
			case "destory":
				//				alert(obtStatus);
				if(obtStatus !== "none") {
					isValidCmd = true;
				} else {
					console.log("Error:飞船不存在");
				}
				break;
		}

		if(isValidCmd) {
			this.message.command = cmd.command;
			this.message.id = cmd.id;
			console.log(this.message)
				//			SpaceShip.getMessage(this.message);
		} else {
			//			alert("error");
		}
	},
};

/**
 * 自定义事件接口
 */

var EventUtil = {

	//绑定事件
	addEvent: function(element, type, handler) {
		if(element.addEvent) {
			element.addEvent("on" + type, handler);
		} else if(element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else {
			element["on" + type] = handler;
		}
	},

	//获取发生事件元素
	getTarget: function(event) {
		return event.target || event.srcElement;
	}
};

//
function createCommand() {
	var eleId = e.target.parentNode.parentNode.id.toLowerCase();
	//		console.log(eleId);
	var cmd = {};
	cmd.id = parseInt(eleId.slice(4));
	switch(eleId) {
		case "shipcreate":
			cmd.command = "create";
			cmd.id = document.getElementsByClassName("c-wrapper").length;

			//			console.log(cmd);
			//传送创建命令
			Constructor.sendMessage(cmd);
			break;
		default:
			var clist = e.target.parentNode.classList;
			//				console.log(clist);
			if(clist.contains("c-bw-start")) {
				//					console.log("start");

				cmd.command = "start";
			} else if(clist.contains("c-bw-stop")) {
				//					console.log("stop");
				cmd.command = "stop";

			} else if(clist.contains("c-bw-destory")) {
				//					console.log("destory");
				cmd.command = "destory";
			} else {
				console.log("others");
			}
			//传送执行命令
			//				console.log(cmd);
			Constructor.sendMessage(cmd);
			break;
	}
	//		console.log(cmd);
};
//初始化
function init() {
	var cPanel = document.getElementById("control-panel");
	EventUtil.addEvent(cPanel, "click", createCommand);

};
init();