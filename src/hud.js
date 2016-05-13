function hud(x, y, width, height) {
	
	this.next_level_button = function() {
		hud.buttons = [];
		new_level();
		transition_state("game");
	};
	
	this.increase_health_button = function() {
		player.level_health();
	};
	
	this.x = x;
	this.y = y;
	this.font_size = 20;
	this.width = width;
	this.height = height;
	this.messages = [];
	this.buttons = [];
	
	var OSName="Unknown OS";
	if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
	if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
	if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
	if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

	this.set_message = function(message) {
		this.messages.push(message);
		if(this.messages.length >= this.height / this.font_size / 2) {
			this.messages.shift();
		}
	};

	this.init_menu = function() {
		this.buttons.push(new button(40, 40, 122, 40, "Next Level", this.next_level_button));
		this.buttons.push(new button(166, 40, 122, 40, "+ Health", this.increase_health_button));
		this.messages = [];
	};

	this.draw = function() {
		if(state === "game") {
			this.draw_game();
		} else if(state === "menu") {
			this.draw_menu();
		}
	};
	
	this.draw_game = function() {
		if(OSName === "MacOS") {
			context.font = this.font_size + "px Andale Mono";
		} else if(OSName === "Windows") {
			context.font = this.font_size + "px Lucida Console";
		}
		context.fillStyle = "#00FF00";
		context.strokeStyle = "#00FF00";
		context.lineWidth = "2";
		context.rect(this.x, this.y, this.width, this.height);
		context.stroke();
		context.fillText("HEALTH: " + player.health + "/" + player.max_health, this.x + 20, this.y + 20);
		context.fillText("XP: " + player.xp + "/" + player.xpn, this.x + 200, this.y + 20);
		//context.fillText("--------------------", this.x + 20, this.y + 420);
		for(var i = 0; i < this.messages.length; i++) {
			context.fillText(this.messages[i], this.x + 20, this.y + 100 + (20 * i));
		}
	};
	
	this.draw_menu = function() {
		if(OSName === "MacOS") {
			context.font = this.font_size + "px Andale Mono";
		} else if(OSName === "Windows") {
			context.font = this.font_size + "px Lucida Console";
		}
		context.fillStyle = "#00FF00";
		context.strokeStyle = "#00FF00";
		context.lineWidth = "2";
		context.rect(20, 20, canvas.width - 40, canvas.height - 40);
		context.stroke();
		context.fillText("Skill points: " + player.level_points, 40, 250);
		for(var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].draw();
		}
	};
}