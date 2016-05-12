function player() {
	this.x = 1;
	this.y = 1;
	this.color = "#0000FF";
	this.attack = 4;
	this.health = 12;
	this.current_room = null;
	var space_border = 1;
	
	this.attack_enemy = function(enemy) {
		enemy.recive_attack(this.attack, this);
	};

	this.recive_attack = function(damage) {
		this.take_damage(damage);
		hud.set_message("You were attacked, took " + damage + " damage");
	};

	this.take_damage = function(damage) {
		this.health -= damage;
		if(this.health <= 0) {
			this.color = "#FF00FF";
		}
	};

	this.draw = function() {
		context.fillStyle = this.color;
		context.fillRect(this.current_room.x * ((BLOCK_WIDTH * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.x) + space_border, this.current_room.y * ((BLOCK_HEIGHT * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.y) + space_border, SPACE_SIZE - (space_border * 2), SPACE_SIZE - (space_border * 2));
	};
}