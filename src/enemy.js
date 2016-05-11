function enemy(x, y, room) {
	this.x = x;
	this.y = y;
	this.health = 10;
	this.room = room;
	var space_border = 2;
	
	this.take_damage = function(damage) {
		this.health -= damage;
	};
	
	this.draw = function() {
		context.fillStyle = "#FF0000";
		context.fillRect(this.room.x * ((BLOCK_WIDTH * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.x) + space_border, this.room.y * ((BLOCK_HEIGHT * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.y) + space_border, SPACE_SIZE - (space_border * 2), SPACE_SIZE - (space_border * 2));
	};
}
