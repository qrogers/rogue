var enemies = new Object();

var enemy_name = "";

enemy_name = "cron";

enemies[enemy_name] = new Object();
enemies[enemy_name]["name"] = enemy_name;
enemies[enemy_name]["attack"] = 2;
enemies[enemy_name]["health"] = 7;
enemies[enemy_name]["skill"] = 12;
enemies[enemy_name]["xp_bounty"] = 15;
enemies[enemy_name]["money_bounty"] = 5;
enemies[enemy_name]["color"] = "#FFFF11";

enemy_name = "firewall";

enemies[enemy_name] = new Object();
enemies[enemy_name]["name"] = enemy_name;
enemies[enemy_name]["attack"] = 1;
enemies[enemy_name]["health"] = 20;
enemies[enemy_name]["skill"] = 5;
enemies[enemy_name]["xp_bounty"] = 20;
enemies[enemy_name]["money_bounty"] = 5;
enemies[enemy_name]["color"] = "#FF1111";

enemy_name = "anti_virus";

enemies[enemy_name] = new Object();
enemies[enemy_name]["name"] = enemy_name;
enemies[enemy_name]["attack"] = 3;
enemies[enemy_name]["health"] = 6;
enemies[enemy_name]["skill"] = 8;
enemies[enemy_name]["xp_bounty"] = 22;
enemies[enemy_name]["money_bounty"] = 5;
enemies[enemy_name]["color"] = "#EE00FF";

function enemy(x, y, room, ai, type) {
	this.x = x;
	this.y = y;
	this.type = type;
	this.name         = type["name"];
	this.attack       = type["attack"];
	this.health       = type["health"];
	this.skill        = type["skill"];
	this.xp_bounty    = type["xp_bounty"];
	this.money_bounty = type["money_bounty"];
	this.color        = type["color"];
	this.room = room;
	this.ai = ai;
	var space_border = 2;

	this.recive_attack = function(damage, attacker) {
		hud.set_message("You dealt " + damage + " damage");
		this.take_damage(damage);
	};

	this.attack_enemy = function(target) {
		if(Math.random() <= this.skill / target.skill) {
			if(random_range(0, 100) <= this.skill - target.skill) {
				target.recive_attack(this.attack * this.attack);
				hud.set_message("You took critical damage");
			} else {
				target.recive_attack(this.attack);
			}
		} else {
			hud.set_message("Enemy missed");
		}
	};

	this.take_damage = function(damage) {
		this.health -= damage;
		if(this.health <= 0) {
			hud.set_message("Enemy killed");
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
