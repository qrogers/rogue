function hud(x, y, width, height) {
	
	this.next_level_button = function() {
		hud.buttons = [];
		new_level();
		transition_state("game");
	};
	
	this.increase_health_button = function() {
		player.level_skill("health");
	};
	
	this.increase_attack_button = function() {
		player.level_skill("attack");
	};
	
	this.increase_skill_button = function() {
		player.level_skill("skill");
	};
	
	this.x = x;
	this.y = y;
	this.font_size = 20;
	this.width = width;
	this.height = height;
	this.messages = [];
	this.pop_up_text = [];
	this.buttons = [];
	
	this.story_texts = [["LEVEL 1 Story","More story","EVEN MORE STORY"], ["LEVEL 2 Story"], ["LEVEL 3 Story"]];
	
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
		this.buttons.push(new button(40, 84, 122, 40, "+ Health", this.increase_health_button));
		this.buttons.push(new button(166, 84, 122, 40, "+ Attack", this.increase_attack_button));
		this.buttons.push(new button(292, 84, 122, 40, "+ Skill", this.increase_skill_button));
		this.messages = [];
	};
	
	this.pop_up = function() {
		context.fillStyle = MAIN_COLOR;
		context.strokeStyle = MAIN_COLOR;
		context.lineWidth = "2";
		context.rect(20, 20, 100, 100);
		context.fillText("press space to dismiss", 40, 120);
		context.stroke();
		for(var i = 0; i < this.pop_up_text.length; i++) {
			context.fillText(this.pop_up_text[i], 52, 52 + (i * 20));
		}
	};

	this.draw = function() {
		if(state === "game") {
			this.draw_game();
		} else if(state === "menu") {
			this.draw_menu();
		}
		context.fillText("HEALTH: " + player.health + "/" + player.max_health, this.x + 20, this.y + 40);
		context.fillText("XP: " + player.xp + "/" + player.xpn, this.x + 200, this.y + 40);
		context.fillText("ATTACK: " + player.attack, this.x + 20, this.y + 80);
		context.fillText("SKILL: " + player.skill, this.x + 200, this.y + 80);
		context.fillText("Skill Points: " + player.level_points, this.x + 20, this.y + 720);
		context.fillText("Money: " + player.money, this.x + 20, this.y + 740);
	};
	
	this.draw_game = function() {
		if(OSName === "MacOS") {
			context.font = this.font_size + "px Andale Mono";
		} else if(OSName === "Windows") {
			context.font = this.font_size + "px Lucida Console";
		}
		context.fillStyle = MAIN_COLOR;
		context.strokeStyle = MAIN_COLOR;
		context.lineWidth = "2";
		context.rect(this.x, this.y, this.width, this.height);
		context.stroke();
		for(var i = 0; i < this.messages.length; i++) {
			context.fillText(this.messages[i], this.x + 20, this.y + 120 + (20 * i));
		}
		if(this.pop_up_text.length > 0) {
			this.pop_up();
		}
	};

	this.draw_menu = function() {
		if(OSName === "MacOS") {
			context.font = this.font_size + "px Andale Mono";
		} else if(OSName === "Windows") {
			context.font = this.font_size + "px Lucida Console";
		}
		context.fillStyle = MAIN_COLOR;
		context.strokeStyle = MAIN_COLOR;
		context.lineWidth = "2";
		context.rect(20, 20, canvas.width - 40, canvas.height - 40);
		context.stroke();
		for(var i = 0; i < this.story_texts[level].length; i++) {
			context.fillText(this.story_texts[level][i], 550, 300 + (i * 20));
		}
		context.fillText("Controls:", 800, 450);
		context.fillText("W: Move up", 840, 470);
		context.fillText("A: Move left", 840, 490);
		context.fillText("S: Move down", 840, 510);
		context.fillText("D: Move right", 840, 530);
		context.fillText("Move into enemies to attack", 840, 550);
		context.fillText("Player", 1200, 400);
		context.fillText("Enemy", 1200, 440);
		context.fillText("Chest", 1200, 480);
		context.fillText("Exit", 1200, 520);
		context.fillStyle = PLAYER_COLOR;
		context.fillRect(1200, 405, SPACE_SIZE, SPACE_SIZE);
		context.fillStyle = "#FF0000";
		context.fillRect(1200, 445, SPACE_SIZE, SPACE_SIZE);
		context.fillStyle = CHEST_COLOR;
		context.fillRect(1200, 485, SPACE_SIZE, SPACE_SIZE);
		context.fillStyle = EXIT_COLOR;
		context.fillRect(1200, 525, SPACE_SIZE, SPACE_SIZE);
		for(var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].draw();
		}
	};
}