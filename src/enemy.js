var enemies = new Object();

var enemy_name = "";

var ai_obj = new ai();

//Names: htop, node.js, rvm, java, gcc

enemy_name = "cron";

enemies[enemy_name] = new Object();
enemies[enemy_name]["name"] = enemy_name;
enemies[enemy_name]["attack"] = 3;
enemies[enemy_name]["defense"] = 1;
enemies[enemy_name]["health"] = 8;
enemies[enemy_name]["skill"] = 15;
enemies[enemy_name]["xp_bounty"] = 9;
enemies[enemy_name]["color"] = "#FFFF11";
enemies[enemy_name]["ai"] = ai_obj.seek_and_attack_player;

enemy_name = "firewall";

enemies[enemy_name] = new Object();
enemies[enemy_name]["name"] = enemy_name;
enemies[enemy_name]["attack"] = 2;
enemies[enemy_name]["defense"] = 2;
enemies[enemy_name]["health"] = 16;
enemies[enemy_name]["skill"] = 7;
enemies[enemy_name]["xp_bounty"] = 16;
enemies[enemy_name]["color"] = "#FF1111";
enemies[enemy_name]["ai"] = ai_obj.seek_and_attack_player;

enemy_name = "anti_virus";

enemies[enemy_name] = new Object();
enemies[enemy_name]["name"] = enemy_name;
enemies[enemy_name]["attack"] = 4;
enemies[enemy_name]["defense"] = 1;
enemies[enemy_name]["health"] = 8;
enemies[enemy_name]["skill"] = 10;
enemies[enemy_name]["xp_bounty"] = 18;
enemies[enemy_name]["color"] = "#EE00FF";
enemies[enemy_name]["ai"] = ai_obj.seek_and_attack_player;

enemy_name = "deep_scan";

enemies[enemy_name] = new Object();
enemies[enemy_name]["name"] = enemy_name;
enemies[enemy_name]["attack"] = 6;
enemies[enemy_name]["defense"] = 2;
enemies[enemy_name]["health"] = 14;
enemies[enemy_name]["skill"] = 14;
enemies[enemy_name]["xp_bounty"] = 19;
enemies[enemy_name]["color"] = "#CCFF33";
enemies[enemy_name]["ai"] = ai_obj.seek_and_attack_player;

enemy_name = "counter_hack";

enemies[enemy_name] = new Object();
enemies[enemy_name]["name"] = enemy_name;
enemies[enemy_name]["attack"] = 8;
enemies[enemy_name]["defense"] = 4;
enemies[enemy_name]["health"] = 17;
enemies[enemy_name]["skill"] = 16;
enemies[enemy_name]["xp_bounty"] = 25;
enemies[enemy_name]["color"] = "#FF9933";
enemies[enemy_name]["ai"] = ai_obj.seek_and_attack_player;

enemy_name = "clean_up";

enemies[enemy_name] = new Object();
enemies[enemy_name]["name"] = enemy_name;
enemies[enemy_name]["attack"] = 4;
enemies[enemy_name]["defense"] = 2;
enemies[enemy_name]["health"] = 5;
enemies[enemy_name]["skill"] = 35;
enemies[enemy_name]["xp_bounty"] = 22;
enemies[enemy_name]["color"] = "#AA9955";
enemies[enemy_name]["ai"] = ai_obj.random_and_attack_player;

function enemy(x, y, room, type) {
	this.x = x;
	this.y = y;
	this.type = type;
	this.name         = type["name"];
	this.attack       = type["attack"];
	this.defense      = type["defense"];
	this.health       = type["health"];
	this.max_health   = type["health"];
	this.skill        = type["skill"];
	this.xp_bounty    = type["xp_bounty"];
	this.color        = type["color"];
	this.ai           = type["ai"];
	this.room = room;
	var space_border = 2;

	this.recive_attack = function(damage, attacker) {
		hud.set_message("damage dealt");
		this.take_damage(damage);
	};

	this.attack_enemy = function(target) {
		if(Math.random() <= this.skill / target.skill) {
			if(random_range(0, 100) <= this.skill - target.skill) {
				target.recive_attack(this.attack * this.attack);
			} else {
				target.recive_attack(this.attack);
			}
		} else {
			hud.set_message("hostile script attack failed");
		}
	};

	this.take_damage = function(damage) {
		this.health -= damage - (this.defense * (1 - player.penetration));
		if(this.health <= 7 && player.abilities.includes("decompile")) {
			this.health = 0;
		}
		if(this.health <= 0) {
			hud.set_message("hostile script terminated");
		}
	};
	
	this.move = function() {
		return this.ai(this);
	};
	
	this.draw = function() {
		context.fillStyle = this.color;
		context.fillRect(this.room.x * ((BLOCK_WIDTH * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.x) + space_border, this.room.y * ((BLOCK_HEIGHT * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.y) + space_border, SPACE_SIZE - (space_border * 2), SPACE_SIZE - (space_border * 2));
	};
}
