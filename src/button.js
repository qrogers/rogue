function button(x, y, width, height, text, click, color) {
	this.x = x;
	this.y = y;
	this.color = color;
	if(typeof this.color === 'undefined') {
		this.color = MAIN_COLOR;
	}
	this.width  = width;
	this.height = height;
	this.text = text;
	this.click = click;
	
	this.clicked = function(x, y) {
		if(this.x < x && this.y < y && this.x + this.width > x && this.y + this.height > y) {
			this.click();
			draw();
		}
	};
	
	this.draw = function() {
		context.fillStyle = this.color;
		context.rect(this.x, this.y, this.width, this.height);
		context.stroke();
		context.fillText(this.text, this.x + 2, this.y + this.height * .65);
	};
}