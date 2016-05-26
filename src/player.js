function player() {
	this.x;
	this.y;
	this.color = PLAYER_COLOR;
	this.attack = 4;
	this.max_health = 12;
	this.health = this.max_health;
	this.skill = 25;
	//Pen = % of Defense ignored
	this.penetration = 0;
	this.defense = 1;
	this.xp = 0;
	this.xpn = 100;
	this.abilities = [];
	this.level = 1;
	this.level_points = 100;
	this.respawn = false;
	this.current_room = null;
	
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
		if(damage - this.defense > 0) {
			this.health -= damage - this.defense;
			if(this.health <= 0) {
				if(this.respawn) {
					this.health = 5;
					hud.set_message("critical failure recoverd");
				} else {
					transition_state("menu");
					this.health = this.max_health;
				}
			}
		} else {
			hud.set_message("took no damage");
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
	
	this.add_ability = function(ability) {
		if(this.level_points >= 3) {
			this.abilities.push(ability);
		}
	};
	
	this.level_skill = function(skill, amount) {
		if(this.level_points > 0) {
			if(skill === "health") {
				this.max_health += amount;
				this.health = this.max_health;
			} else if (skill === "attack") {
				this.attack += amount;
			} else if (skill === "skill") {
				this.skill += amount;
			} else if (skill === "penetration") {
				this.penetration += amount;			
			}  else if (skill === "defense") {
				this.defense += amount;			
			}
		}
	};

	this.draw = function() {
		context.fillStyle = this.color;
		context.fillRect(this.current_room.x * ((BLOCK_WIDTH * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.x) + space_border, this.current_room.y * ((BLOCK_HEIGHT * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.y) + space_border, SPACE_SIZE - (space_border * 2), SPACE_SIZE - (space_border * 2));
	};
}