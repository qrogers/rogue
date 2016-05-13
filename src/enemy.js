function enemy(x, y, room) {
	this.x = x;
	this.y = y;
	this.attack = 1;
	this.health = 10;
	this.skill = 9;
	this.xp_bounty = 18;
	this.room = room;
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
	
	this.draw = function() {
		context.fillStyle = "#FF0000";
		context.fillRect(this.room.x * ((BLOCK_WIDTH * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.x) + space_border, this.room.y * ((BLOCK_HEIGHT * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.y) + space_border, SPACE_SIZE - (space_border * 2), SPACE_SIZE - (space_border * 2));
	};
}
