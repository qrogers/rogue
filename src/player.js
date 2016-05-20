function player() {
	this.x;
	this.y;
	this.color = PLAYER_COLOR;
	this.attack = 4;
	this.max_health = 12;
	this.health = this.max_health;
	this.skill = 25;
	this.xp = 0;
	this.xpn = 100;
	this.money = 100;
	this.level = 1;
	this.level_points = 1;
	this.current_room = null;
	this.inventroy = [];
	
	var space_border = 1;
	
	this.attack_enemy = function(enemy) {
		if(Math.random() <= this.skill / enemy.skill) {
			if(random_range(0, 100) <= this.skill - enemy.skill) {
				enemy.recive_attack(this.attack * 2, this);
				hud.set_message("Critical hit");
			} else {
				enemy.recive_attack(this.attack, this);
			}
		} else {
			hud.set_message("You missed");
		}
	};

	this.recive_attack = function(damage) {
		this.take_damage(damage);
		hud.set_message("You were attacked, took " + damage + " damage");
	};

	this.take_damage = function(damage) {
		this.health -= damage;
		if(this.health <= 0) {
			transition_state("menu");
			this.health = this.max_health;
		}
	};

	this.gain_xp = function(amount) {
		this.xp += amount;
		if(this.xp >= this.xpn) {
			this.level_up();
		}
	};
	
	this.gain_money = function(amount) {
		this.money += amount;
	};
	
	this.level_up = function() {
		this.level_points += 1;
		this.level += 1;
		this.xp -= this.xpn;
		hud.set_message("Level up");
	};
	
	this.add_to_onventory = function(item) {
		this.inventory.push(item);
	};
	
	this.level_skill = function(skill) {
		if(this.level_points > 0) {
			if(skill === "health") {
				this.max_health += 2;
				this.health = this.max_health;
				this.level_points -= 1;
			} else if (skill === "attack") {
				this.attack += 1;
				this.level_points -= 1;
			} else if (skill === "skill") {
				this.skill += 3;
				this.level_points -= 1;
			}
		}
	};

	this.draw = function() {
		context.fillStyle = this.color;
		context.fillRect(this.current_room.x * ((BLOCK_WIDTH * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.x) + space_border, this.current_room.y * ((BLOCK_HEIGHT * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.y) + space_border, SPACE_SIZE - (space_border * 2), SPACE_SIZE - (space_border * 2));
	};
}