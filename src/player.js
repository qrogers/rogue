function player() {
	this.x = 1;
	this.y = 1;
	this.attack = 4;
	this.current_room = null;
	var space_border = 1;
	
	this.draw = function() {
		context.fillStyle = "#0000FF";
		context.fillRect(this.current_room.x * ((BLOCK_WIDTH * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.x) + space_border, this.current_room.y * ((BLOCK_HEIGHT * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.y) + space_border, SPACE_SIZE - (space_border * 2), SPACE_SIZE - (space_border * 2));
	};
}