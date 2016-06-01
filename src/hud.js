function hud(x, y, width, height) {
	
	this.x = x;
	this.y = y;
	this.font_size = 20;
	this.width = width;
	this.height = height;
	this.messages = [];
	this.pop_up_text = [];
	this.last_pop_up = [];
	this.buttons = [];
	
	//red to green, 21 colors
	this.health_colors = ["#FF0000", "#F20D00", "#E61A00", "#D92600", "#CC3300", "#BF4000", "#B24C00", "#A65900", "#996600", "#8C7300", "#808000", "#738C00", "#669900", "#59A600", "#4DB200", "#40BF00", "#33CC00", "#26D900", "#19E600", "#0DF200", "#00FF00"];
	
	this.death_button_function = function() {
		transition_state("menu");
	};
	
	this.death_button = new button(canvas.width / 2 - 90, canvas.height / 2 + 40, 232, 40, " return to console", this.death_button_function, "#FF0000");
	this.start_button = new button(canvas.width / 2 - 120, canvas.height / 2 + 40, 90, 40, " login", this.death_button_function, "#FF0000");
	
	this.next_level_button = function() {
		hud.buttons = [];
		var current_level_data = level_data[level];
		new_level(current_level_data[0], current_level_data[1], current_level_data[2], current_level_data[3], current_level_data[4], current_level_data[5], current_level_data[6], current_level_data[7], current_level_data[8]);
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
			return button.text === " decompile";
		};
		if(player.level_points > 2) {
			player.level_points -= 3;
			player.add_ability("decompile");
			hud.buttons.splice(hud.buttons.findIndex(find_func), 1);
		}
	};
	
	this.asyncronous_cpu_button = function() {
		find_func = function(button) {
			return button.text === " asyncronous CPU";
		};
		if(player.level_points > 2) {
			player.level_points -= 3;
			player.add_ability("asyncronous_cpu");
			player.level_skill("penetration", .2);
			player.level_skill("attack", 4);
			hud.buttons.splice(hud.buttons.findIndex(find_func), 1);
		}
	};
	
	this.encoding_button = function() {
		if(player.level_points > 0) {
			player.level_points -= 1;
			player.level_skill("defense", 1);
		}
	};
	
	this.redundent_systems_button = function() {
		if(player.level_points > 0) {
			player.level_points -= 1;
			player.level_skill("health", 2);
		}
	};
	
	this.security_button = function() {
		if(player.level_points > 0) {
			player.level_points -= 1;
			player.level_skill("skill", 2);
		}
	};
	
	this.passcodes_button = function() {
		find_func = function(button) {
			return button.text === " passcodes";
		};
		if(player.level_points > 2) {
			player.level_points -= 3;
			player.add_ability("passcodes");
			player.level_skill("skill", 7);
			hud.buttons.splice(hud.buttons.findIndex(find_func), 1);
		}
	};
	
	this.process_respawning_button = function() {
		find_func = function(button) {
			return button.text === " process respawning";
		};
		if(player.level_points > 2) {
			player.level_points -= 3;
			player.add_ability("process_respawning");
			hud.buttons.splice(hud.buttons.findIndex(find_func), 1);
		}
	};
	
	this.story_texts = [
							["Hacking Proceedure Review",
							 "Employee X047,",
							 "We are sending you into a",
							 "test server.",
							 "I want to make sure you",
							 "know the basics, remember:",
							 "",
							 "Navigate the directories",
							 "with WASD.",
							 "",
							 "Moving onto black spaces",
							 "will move you to the next",
							 "directory. The exit is white.",
							 "",
							 "Watch out for hostile programs",
							 "indicated by bright colored",
							 "squares. You can attack them",
							 "by moving into them.",
							 "But be careful, they will",
							 "damage your connection,",
							 "if it drops to zero, you",
							 "will have to try again.",
							 "",
							 "You will also find",
							 "code fragments which you",
							 "can use to improve your",
							 "hacking process.",
							 "",
							 "    -Your employer"],
							
							["Your first asignment",
							 "Employee X047,",
							 "We require the sensitive data",
							 "contained within the private",
							 "steams of various individuals.",
							 "Why is not important so do",
							 "not ask questions. Your",
							 "first mark is Jane Doe.",
							 "Learn all that you can.",
							 "Oh, and don't get caught",
							 "will you.",
							 "",
							 "    -Your employer"],
							 
							 ["A New Direction",
							 "Employee X047,",
							 "Good work on your last venture.",
							 "Now, this next task may seem",
							 "odd to you. We require data",
							 "from the Facebook wall of one",
							 "Jake Baker. He is an childish",
							 "individual, however, we believe",
							 "there's information of interest",
							 "to be located. Tred carefully.",
							 "",
							 "    -Your employer"],
							 
							 ["Moving Forward",
							 "Employee X047,",
							 "We are pleased by the data",
							 "you managed to recover, however",
							 "there is yet more to be done.",
							 "Your next target is John Doe.",
							 "Specifically, we need access to",
							 "his bank records so expect more",
							 "resistance this time around.",
							 "We trust you will not", 
							 "disappoint.",
							 "",
							 "    -Your employer"],
							 
							 ["High Stakes",
							 "Employee X047,",
							 "This next matter is of an",
							 "extremely sensitive nature",
							 "I trust I need not remind you",
							 "what will happen should you",
							 "fancy yourself bold enough",
							 "to leak this information.",
							 "Now, this next individual, a",
							 "one Tory Iceheart, is personal",
							 "secretary to some...important",
							 "people. We need what she knows.",
							 "Get it, and leave no traces",
							 "of your presence.",
							 "",
							 "    -Your employer"]
						];
						
	this.pop_up_text_data = [
							[["You will encounter various bits", "of information as you reach new", "directories"]],
							
							//These are tied to level 1
							[
							["Today I met this wonderful new guy.", "I did not know what to say to him -", "the anxiety is killing me!", "If only he knew how warm I could be…", "how warm I could be…"],
							["Brother insists that I be more careful", "putting revealing photos of myself on", "Facebook - I told him to shove off!", "It’s not like anyone can see it when", "it’s set to private...sheesh!"],
							["Mother and I had a falling out again…", "she insists I’m irresponsible with my time", "- as if! We’ll see how she feels when I forget", "to call her on Mother’s Day."],
							["I wish you were more available to go to the Mall.", "I need new clothes and my paycheck just came", "today. Let’s just say I can afford it!!"],
							["What did you think of that speech from", "Donald Duck? I tell you I’m one word away from", "going to one of his rallies and blowing", "everyone up!"]
							],
							
							//These are tied to level 2
							[
							["$80,000 - Radiation Treatment", "           - Approved by Doctor"],
							["$40,000 - Default on Housing Payment"],
							["$10,200 - Gambling, Chesto’s Casino and Spa"],
							["$8,000 - Payment Transfer to Joanna Price,", "           Specification: Child Care"],
							["NOTICE: You’ve exceeded credit on this account", "           - please contact your local banker"]
							],
							
							//These are tied to level 3
							[
							["Yo! Come to the junction today", "- we’re doing something fun and slightly illegal…", "you’d all better come or I’m coming after you!"],
							["Smoke-out going on in the forest.", "Bring your friends, or don’t, whatever!"],
							["Send your prayers for my Mom,", "she’s not been doing well lately", "- I’m… I’m really serious about this", "guys so don’t laugh, alright"],
							["I want you all to come to my charity event", "- yeah yeah it’s for class alright don’t", "think I’ve gone soft alright…", "just shut up!"]
							],
							
							//These are tied to level 4
							[
							["The board has advised I move the offshore", "account to somewhere other than Switzerland,", "they say it’s too cliche. I wish they’d just", "pay the taxes and be done with it -", "their money is more important to them than their", "wives!"],
							["This reporter for the Daily Planet has been", "hounding my office for a comment on the recent", "scandal. I keep telling her that no comment", "means no comment! I, however, don’t doubt the", "chairman is capable of committing murder but", "it’s not my place", "to say anything beyond this log", "- after all this salary is keeping me afloat."],
							["The FBI came in today with a warrant.", "The board has already had the files destroyed.", "Heh clever buggars.", "I suppose the powerful really don’t get", "what’s coming to them - then again I don’t much", "care."],
							["IT sent me a message about security breaches.", "They say my password isn’t sufficiently difficult.", "I added a number."]
							]
						];
	
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
		this.buttons.push(new button(1560, 640, 170, 40, " begin attack", this.next_level_button, "#FF0000"));
		
		//Names: Credentials
		
		this.buttons.push(new button(500, 160, 250, 40, " decryption", this.decryption_button));
		this.buttons.push(new button(500, 260, 250, 40, " threading", this.threading_button));
		this.buttons.push(new button(500, 360, 250, 40, " runtime", this.runtime_button));
		
		//Instakill enemies that drop below 8 health
		if(!player.abilities.includes("decompile")) {
			this.buttons.push(new button(500, 560, 250, 40, " decompile", this.decompile_button));
		}
		
		//Large attack and penetration increase
		if(!player.abilities.includes("asyncronous_cpu")) {
			this.buttons.push(new button(500, 660, 250, 40, " asyncronous CPU", this.asyncronous_cpu_button));
		}
		
		this.buttons.push(new button(810, 160, 250, 40, " encoding", this.encoding_button));
		this.buttons.push(new button(810, 260, 250, 40, " redundent systems", this.redundent_systems_button));
		this.buttons.push(new button(810, 360, 250, 40, " security", this.security_button));
		
		//Large skill increase
		if(!player.abilities.includes("passcodes")) {
			this.buttons.push(new button(810, 560, 250, 40, " passcodes", this.passcodes_button));
		}
		
		//Sets player to 5 health after a fatal hit once per level
		if(!player.abilities.includes("process_respawning")) {
			this.buttons.push(new button(810, 660, 250, 40, " process respawning", this.process_respawning_button));
		}
		
		// this.buttons.push(new button(1150, 160, 250, 40, " SSH Monitoring", this.increase_health_button));
		// this.buttons.push(new button(1150, 260, 250, 40, " Backdoor Connection", this.increase_health_button));
		// this.buttons.push(new button(1150, 360, 250, 40, " System Memory", this.increase_health_button));
		// this.buttons.push(new button(1150, 460, 250, 40, " User Logs", this.increase_health_button));
		
		this.messages = [];
	};
	
	this.pop_up = function() {
		context.lineWidth = "2";
		context.strokeStyle = MAIN_COLOR;
		context.rect(840, 20, 600, (this.pop_up_text.length + 5) * 20);
		context.fillStyle = "#009900";
		context.fillRect(840, 20, 600, (this.pop_up_text.length + 5) * 20);
		context.fillStyle = "#000015";
		context.fillText("data entry found:", 850, 40);
		context.fillText("press space to dismiss", 850, (this.pop_up_text.length + 5) * 20);
		context.stroke();
		for(var i = 0; i < this.pop_up_text.length; i++) {
			context.fillText(this.pop_up_text[i], 850, 82 + (i * 20));
		}
	};

	this.draw = function() {
		if(state === "game") {
			this.draw_game();
		} else if(state === "menu") {
			this.draw_menu();
		} else if(state === "death") {
			this.draw_death();
		} else if(state === "start") {
			this.draw_start();
		} else if(state === "win") {
			this.draw_win();
		}
		context.fillStyle = MAIN_COLOR;
		if(state !== "death" && state !== "start" && state !== "win") {
			context.fillStyle = this.health_colors[Math.floor((Math.floor((player.health / player.max_health) * 100)) / 4.8)];
			context.fillText("connection strength: " + (Math.floor((player.health / player.max_health) * 100)) + "%", this.x + 20, 100);
			context.fillStyle = MAIN_COLOR;
			context.fillText("code fragments: " + (Math.floor((player.xp / player.xpn) * 100)) + "%", this.x + 20, this.y + 120);
		}
	};
	
	this.draw_game = function() {
		if(OSName === "MacOS") {
			context.font = this.font_size + "px Andale Mono";
		} else if(OSName === "Windows") {
			context.font = this.font_size + "px Courier";
		}
		context.fillStyle = MAIN_COLOR;
		context.strokeStyle = MAIN_COLOR;
		context.lineWidth = "2";
		context.rect(this.x, this.y, this.width, this.height);
		context.stroke();
		context.fillText("------hack status------", 1510, 70);
		context.fillText("------log------", 1570, 170);
		for(var i = 0; i < this.messages.length; i++) {
			context.fillText(this.messages[i], this.x + 20, this.y + 190 + (20 * i));
		}
		if(this.pop_up_text.length > 0) {
			this.pop_up();
		}
		context.fillStyle = MAIN_COLOR;
		context.fillText("hostile programs:", this.x + 20, this.y + 480);
		for(var i = 0; i < player.current_room.enemies.length; i ++) {
			context.fillStyle = MAIN_COLOR;
			context.fillText(player.current_room.enemies[i].name + ' ' + (Math.floor((player.current_room.enemies[i].health / player.current_room.enemies[i].max_health) * 100)) + "%", this.x + 20, this.y + 500 + (i * 20));
			context.fillStyle = player.current_room.enemies[i].color;
			context.fillRect(this.x + 2, this.y + 490 + (i * 20), SPACE_SIZE, SPACE_SIZE);
		}
		context.fillStyle = MAIN_COLOR;
		context.fillText("data node", this.x + 20, this.y + 780);
		context.fillText("exit", this.x + 280, this.y + 780);
		context.fillStyle = CHEST_COLOR;
		context.fillRect(this.x + 140, this.y + 765, SPACE_SIZE, SPACE_SIZE);
		context.fillStyle = EXIT_COLOR;
		context.fillRect(this.x + 340, this.y + 765, SPACE_SIZE, SPACE_SIZE);
	};

	this.draw_death = function() {
		context.font = this.font_size + "px Courier";
		context.strokeStyle = MAIN_COLOR;
		context.fillStyle = MAIN_COLOR;
		context.fillText(">systems failing", canvas.width / 2 - 100, 280);
		context.fillText(">fatal error", canvas.width / 2 - 100, 300);
		context.fillText(">illegal access detected", canvas.width / 2 - 100, 320);
		//context.fillText(">connection terminated", canvas.width / 2 - 100, 340);
		
		context.fillText("____ ____ _  _ _  _ ____ ____ ___ _ ____ _  _    _    ____ ____ ___", canvas.width / 2 - 350, 360);
		context.fillText("|    |  | |\\ | |\\ | |___ |     |  | |  | |\\ |    |    |  | [__   |  ", canvas.width / 2 - 350, 380);
		context.fillText("|___ |__| | \\| | \\| |___ |___  |  | |__| | \\|    |___ |__| ___]  |  ", canvas.width / 2 - 350, 400);
		
		context.stroke();
		this.death_button.draw();
	};
	
	this.draw_start = function() {
		context.font = this.font_size + "px Courier";
		context.strokeStyle = MAIN_COLOR;
		context.fillStyle = MAIN_COLOR;
		context.fillText("____ _   _ ___  ____ ____ ", canvas.width / 2 - 350, 280);
		context.fillText("|     \\_/  |__] |___ |  |", canvas.width / 2 - 350, 300);
		context.fillText("|___   |   |__] |___ |  |", canvas.width / 2 - 350, 320);
		
		context.fillText(" __  ____ ____ _  _ ____", canvas.width / 2 - 98, 320);
		context.fillText("| \\  |  | | __ |  | |___", canvas.width / 2 - 98, 340);
		context.fillText("|  \\ |__| |__] |__| |___", canvas.width / 2 - 98, 360);
		context.stroke();
		this.start_button.draw();
	};
	
	this.draw_win = function() {
		context.font = this.font_size + "px Courier";
		context.strokeStyle = MAIN_COLOR;
		context.fillStyle = MAIN_COLOR;
		context.fillText("_  _ ____ ____ _  _    ____ ____ _  _ ___  _    ____ ___ ____  ", canvas.width / 2 - 350, 280);
		context.fillText("|__| |__| |    |_/     |    |  | |\\/| |__] |    |___  |  |___ ", canvas.width / 2 - 350, 300);
		context.fillText("|  | |  | |___ | \\_    |___ |__| |  | |    |___ |___  |  |___ ", canvas.width / 2 - 350, 320);
		context.fillText("Cyber Rogue", canvas.width / 2 - 350, 480);
		context.fillText("a game by", canvas.width / 2 - 325, 520);
		context.fillText("Joseph Rogers", canvas.width / 2 - 300, 560);
		context.fillText("Matthew Loyola", canvas.width / 2 - 300, 580);
		context.fillText("John Chau", canvas.width / 2 - 300, 600);
		context.fillText("Kevin Vue", canvas.width / 2 - 300, 620);
		context.stroke();
	};
	
	
	// context.fillText("____ _   _ ___  ____ ____ ", canvas.width / 2 - 350, 280);
	// context.fillText("|     \\_/  |__] |___ |__/", canvas.width / 2 - 350, 300);
	// context.fillText("|___   |   |__] |___ |  \\", canvas.width / 2 - 350, 320);
// 		
	// context.fillText("____ ____ ____ _  _ ____", canvas.width / 2 - 100, 320);
	// context.fillText("|__/ |  | | __ |  | |___", canvas.width / 2 - 100, 340);
	// context.fillText("|  \\ |__| |__] |__| |___", canvas.width / 2 - 100, 360);
	
	// context.fillText("____ _   _ ___  ____ ____ ____ ____ ____ _  _ ____", canvas.width / 2 - 350, 280);
	// context.fillText("|     \\_/  |__] |___ |__/ |__/ |  | | __ |  | |___", canvas.width / 2 - 350, 300);
	// context.fillText("|___   |   |__] |___ |  \\ |  \\ |__| |__] |__| |___", canvas.width / 2 - 350, 320);

	this.draw_menu = function() {
		context.font = this.font_size + "px Courier";
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
			context.fillText(this.story_texts[level][i], 76, 160 + (i * 20));
		}
		context.fillText("[----------end message----------]", 41, 170 + (this.story_texts[level].length * 20));
		
		context.fillText("------script console------", 798, 70);
		
		context.fillText("------hack status------", 1510, 70);
		
		if(level !== 0) {
		
			context.fillText("code snippets -->", 720, 100);
			context.fillText("<-- spend on upgrades", 970, 100);
			
			var money_color = "#CC9922";
			
			context.fillStyle = money_color;
			context.fillText(player.level_points, 942, 100);
			
			context.fillStyle = MAIN_COLOR;
			context.fillText("[---targeted scripts---]", 480, 130);
			context.fillText("[----protective scripts----]", 780, 130);
			//context.fillText("[------misc scripts------]", 1130, 130);
			
			if(!player.abilities.includes("decompile")) {
				context.font = this.font_size + "px Lucida Console";
				context.fillStyle = money_color;
				context.fillText("3", 475, 582);
				context.font = 15 + "px Courier";
				context.fillStyle = MAIN_COLOR;
				context.fillText("Deconstruct failing programs", 500, 620);
				context.fillText("to delete them as they fail", 500, 640);
			}
			
			if(!player.abilities.includes("asyncronous_cpu")) {
				context.font = this.font_size + "px Courier";
				context.fillStyle = money_color;
				context.fillText("3", 475, 682);
				context.font = 15 + "px Lucida Console";
				context.fillStyle = MAIN_COLOR;
				context.fillText("Run attack scripts in async", 500, 720);
				context.fillText("to greatly increase offense", 500, 740);
			}
			
			if(!player.abilities.includes("passcodes")) {
				context.font = this.font_size + "px Courier";
				context.fillStyle = money_color;
				context.fillText("3", 785, 582);
				context.font = 15 + "px Lucida Console";
				context.fillStyle = MAIN_COLOR;
				context.fillText("Passcode security allows for", 812, 620);
				context.fillText("greater avoidence of attacks", 812, 640);
			}
			
			if(!player.abilities.includes("process_respawning")) {
				context.font = this.font_size + "px Courier";
				context.fillStyle = money_color;
				context.fillText("3", 785, 682);
				context.font = 15 + "px Lucida Console";
				context.fillStyle = MAIN_COLOR;
				context.fillText("Respawn hacking scripts", 812, 720);
				context.fillText("on first failure", 812, 740);
			}
			
			context.font = this.font_size + "px Courier";
			context.fillStyle = money_color;
			
			context.fillText("1", 785, 182);
			context.fillText("1", 785, 282);
			context.fillText("1", 785, 382);
			
			context.fillText("1", 475, 182);
			context.fillText("1", 475, 282);
			context.fillText("1", 475, 382);
			
			//context.fillText("2", 1125, 182);
			//context.fillText("2", 1125, 282);
			//context.fillText("2", 1125, 382);
			//context.fillText("2", 1125, 482);
			
			//context.font = 10 + "px Lucida Console";
			
			//context.fillText("-cost-", 462, 150);
			
			context.font = 15 + "px Courier";
			context.fillStyle = MAIN_COLOR;
			
			context.fillText("Increase ability to take", 500, 220);
			context.fillText("down defensive programs", 500, 240);
			context.fillText("Run script more effeciently", 500, 320);
			context.fillText("to inflict more damage", 500, 340);
			context.fillText("Faster execution speed for", 500, 420);
			context.fillText("more accurate attacks ", 500, 440);
			
			context.fillText("Better security to improve", 812, 220);
			context.fillText("resistance to attacks", 812, 240);
			context.fillText("Increased redudency to", 812, 320);
			context.fillText("increase connection strength", 812, 340);
			context.fillText("Improve security routines", 812, 420);
			context.fillText("to be harder to attack", 812, 440);
			
			context.font = this.font_size + "px Courier";
			
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
		} else {
			//draw next level button
			this.buttons[0].draw();
		}
	};
}