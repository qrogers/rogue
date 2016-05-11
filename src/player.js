function player() {
	this.x = 1;
	this.y = 1;
	this.current_room = null;
	
	this.draw = function() {
		context.fillStyle = "#FF0000";
		context.fillRect(this.current_room.x * (ROOM_BLOCK_SIZE + ROOM_SPACE) + (UNIT_SIZE * this.x) + ROOM_SPACE, this.current_room.y * (ROOM_BLOCK_SIZE + ROOM_SPACE) + (UNIT_SIZE * this.y) + ROOM_SPACE, ROOM_SPACE, ROOM_SPACE);
	};
}