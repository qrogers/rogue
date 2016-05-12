function hud(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.font_size = 20;
	this.width = width;
	this.height = height;
	this.messages = [];

	this.set_message = function(message) {
		this.messages.push(message);
		if(this.messages.length >= this.height / this.font_size / 2) {
			this.messages.shift();
		}
	};

	this.draw = function() {
		context.fillStyle = "#00FF00";
		context.strokeStyle = "#00FF00";
		context.lineWidth = "2";
		context.font = this.font_size + "px Georgia";
		context.rect(this.x, this.y, this.width, this.height);
		context.stroke();
		context.fillText("HEALTH: " + player.health, this.x + 20, this.y + 20);
		//context.fillText("--------------------", this.x + 20, this.y + 420);
		for(var i = 0; i < this.messages.length; i++) {
			context.fillText(this.messages[i], this.x + 20, this.y + 100 + (20 * i));
		}
	};
}