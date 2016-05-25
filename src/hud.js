function hud(x, y, width, height) {
	
	this.x = x;
	this.y = y;
	this.font_size = 20;
	this.width = width;
	this.height = height;
	this.messages = [];
	this.pop_up_text = [];
	this.buttons = [];
	
	this.next_level_button = function() {
		hud.buttons = [];
		new_level();
		transition_state("game");
	};
	
	this.decryption_button = function() {
		if(player.level_points > 0) {
			player.level_points -= 1;
			player.level_skill("penetration", .1);
		}
	};
	
	this.threading_button = function() {
		if(player.level_points > 0) {
			player.level_points -= 1;
			player.level_skill("attack", 2);
		}
	};
	
	this.runtime_button = function() {
		if(player.level_points > 0) {
			player.level_points -= 1;
			player.level_skill("penetration", .05);
			player.level_skill("attack", 1);
		}
	};
	
	this.decompile_button = function() {
		find_func = function(button) {
			return button.text === " Decompile";
		};
		if(player.level_points > 0) {
			player.level_points -= 3;
			player.add_ability("decompile");
			hud.buttons.splice(hud.buttons.findIndex(find_func), 1);
		}
	};
	
	this.asyncronous_cpu_button = function() {
		find_func = function(button) {
			return button.text === " Asyncronous CPU";
		};
		if(player.level_points > 0) {
			player.level_points -= 3;
			player.add_ability("asyncronous_cpu");
			player.level_skill("penetration", .2);
			player.level_skill("attack", 4);
			hud.buttons.splice(hud.buttons.findIndex(find_func), 1);
		}
	};
	
	this.story_texts = [["Your first asignment",
						 "Hello,",
						 "Your mission is to infiltrate",
						 "the network and do horrible",
						 "things to it.",
						 "Like, really bad things",
						 "Good luck.",
						 "    -Your employer"],
						 
						 ["LEVEL 2 Story"],
						 ["LEVEL 3 Story"]];
	
	var OSName = "Unknown OS";
	if(navigator.appVersion.indexOf("Win")!=-1) OSName = "Windows";
	if(navigator.appVersion.indexOf("Mac")!=-1) OSName = "MacOS";
	if(navigator.appVersion.indexOf("X11")!=-1) OSName = "UNIX";
	if(navigator.appVersion.indexOf("Linux")!=-1) OSName = "Linux";

	this.set_message = function(message) {
		this.messages.push(message);
		if(this.messages.length >= 14) {
			this.messages.shift();
		}
	};

	this.init_menu = function() {
		this.buttons.push(new button(160, 640, 170, 40, " Begin Attack", this.next_level_button, "#FF0000"));
		
		//Names: Credentials
		
		this.buttons.push(new button(500, 160, 250, 40, " Decryption", this.decryption_button));
		this.buttons.push(new button(500, 260, 250, 40, " Threading", this.threading_button));
		this.buttons.push(new button(500, 360, 250, 40, " Runtime", this.runtime_button));
		
		//Instakill enemies that drop below 8 health
		if(!player.abilities.includes("decompile")) {
			this.buttons.push(new button(500, 560, 250, 40, " Decompile", this.decompile_button));
		}
		
		if(!player.abilities.includes("asyncronous_cpu")) {
			this.buttons.push(new button(500, 660, 250, 40, " Asyncronous CPU", this.asyncronous_cpu_button));
		}
		
		this.buttons.push(new button(810, 160, 250, 40, " Encoding", this.increase_health_button));
		this.buttons.push(new button(810, 260, 250, 40, " Security Permission", this.increase_health_button));
		this.buttons.push(new button(810, 360, 250, 40, " Authentication", this.increase_health_button));
		this.buttons.push(new button(810, 560, 250, 40, " Redundent Systems", this.increase_health_button));
		this.buttons.push(new button(810, 660, 250, 40, " Process Respawning", this.increase_health_button));
		
		this.buttons.push(new button(1150, 160, 250, 40, " SSH Monitoring", this.increase_health_button));
		this.buttons.push(new button(1150, 260, 250, 40, " Backdoor Connection", this.increase_health_button));
		this.buttons.push(new button(1150, 360, 250, 40, " System Memory", this.increase_health_button));
		this.buttons.push(new button(1150, 460, 250, 40, " User Logs", this.increase_health_button));
		
		this.messages = [];
	};
	
	this.pop_up = function() {
		context.fillStyle = MAIN_COLOR;
		context.strokeStyle = MAIN_COLOR;
		context.lineWidth = "2";
		context.rect(20, 20, 200, 100);
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
		console.log();
		context.fillText("Detection Level: " + (Math.floor((player.health / player.max_health) * 100)) + "%", this.x + 20, 100);
		context.fillText("Code Fragments: " + (Math.floor((player.xp / player.xpn) * 100)) + "%", this.x + 20, this.y + 120);
		//context.fillText("Code Snippets: " + player.level_points, this.x + 20, this.y + 720);
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
			context.fillText(this.messages[i], this.x + 20, this.y + 150 + (20 * i));
		}
		if(this.pop_up_text.length > 0) {
			this.pop_up();
		}
		context.fillText("Hostile Programs:", this.x + 20, this.y + 480);
		for(var i = 0; i < player.current_room.enemies.length; i ++) {
			context.fillText(player.current_room.enemies[i].name + ' ' + player.current_room.enemies[i].health, this.x + 20, this.y + 500 + (i * 20));
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
		context.rect(40, 40, 400, canvas.height - 80);
		context.rect(460, 40, 1000, canvas.height - 80);
		context.rect(1480, 40, 330, canvas.height - 80);
		context.stroke();
		
		context.fillText("-----email-----", 140, 65);
		context.fillText("[----------new message----------]", 41, 100);
		context.fillText(this.story_texts[level][0], 80, 130);
		for(var i = 1; i < this.story_texts[level].length; i++) {
			context.fillText(this.story_texts[level][i], 80, 160 + (i * 20));
		}
		context.fillText("[----------end message----------]", 41, 170 + (this.story_texts[level].length * 20));
		
		context.fillText("------script console------", 840, 70);
		
		context.fillText("code snippets --> " + player.level_points, 480, 100);
		context.fillText("[---targeted scripts---]", 480, 130);
		context.fillText("[----protective scripts----]", 780, 130);
		context.fillText("[------misc scripts------]", 1130, 130);
		
		context.fillText("1", 475, 182);
		context.fillText("1", 475, 282);
		context.fillText("1", 475, 382);
		
		if(!player.abilities.includes("decompile")) {
			context.fillText("3", 475, 582);
			context.font = 15 + "px Lucida Console";
			context.fillText("Deconstruct failing programs", 500, 620);
			context.fillText("to delete them as they fail", 500, 640);
		}
		
		if(!player.abilities.includes("asyncronous_cpu")) {
			context.fillText("3", 475, 682);
			context.font = 15 + "px Lucida Console";
			context.fillText("Run attack scripts in async", 500, 720);
			context.fillText("to massivly increase offense", 500, 740);
		}
		
		context.font = this.font_size + "px Lucida Console";
		
		context.fillText("1", 785, 182);
		context.fillText("1", 785, 282);
		context.fillText("1", 785, 382);
		context.fillText("3", 785, 582);
		context.fillText("3", 785, 682);
		
		context.fillText("2", 1125, 182);
		context.fillText("2", 1125, 282);
		context.fillText("2", 1125, 382);
		context.fillText("2", 1125, 482);
		
		context.font = 10 + "px Lucida Console";
		
		context.fillText("-cost-", 462, 150);
		
		context.font = 15 + "px Lucida Console";
		
		context.fillText("Increase ability to take", 500, 220);
		context.fillText("down defensive programs", 500, 240);
		context.fillText("Run script more effeciently", 500, 320);
		context.fillText("to better combat attackers", 500, 340);
		context.fillText("Faster execution speed for", 500, 420);
		context.fillText("overall better attacks ", 500, 440);
		
		context.font = this.font_size + "px Lucida Console";
		
		context.fillText("------hack status------", 1510, 70);
		
		// context.fillText("Controls:", 800, 450);
		// context.fillText("W: Move up", 840, 470);
		// context.fillText("A: Move left", 840, 490);
		// context.fillText("S: Move down", 840, 510);
		// context.fillText("D: Move right", 840, 530);
		// context.fillText("Move into enemies to attack", 840, 550);
		// context.fillText("Player", 1200, 400);
		// context.fillText("Enemy", 1200, 440);
		// context.fillText("Chest", 1200, 480);
		// context.fillText("Exit", 1200, 520);
		// context.fillStyle = PLAYER_COLOR;
		// context.fillRect(1200, 405, SPACE_SIZE, SPACE_SIZE);
		// context.fillStyle = "#FF0000";
		// context.fillRect(1200, 445, SPACE_SIZE, SPACE_SIZE);
		// context.fillStyle = CHEST_COLOR;
		// context.fillRect(1200, 485, SPACE_SIZE, SPACE_SIZE);
		// context.fillStyle = EXIT_COLOR;
		// context.fillRect(1200, 525, SPACE_SIZE, SPACE_SIZE);
		for(var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].draw();
		}
	};
}