function button(x, y, width, height, text, click) {
	this.x = x;
	this.y = y;
	this.width  = width;
	this.height = height;
	this.text = text;
	this.click = click;
	this.color = "#00FF00";
	
	this.clicked = function(x, y) {
		console.log("X: " + x);
		console.log("Y: " + y);
		console.log(this.x < x && this.y < y);
		console.log(this.x + this.width > x && this.y + this.height > y);
		if(this.x < x && this.y < y && this.x + this.width > x && this.y + this.height > y) {
			console.log(this.click);
			this.click();
		}
	};
	
	this.draw = function() {
		context.fillStyle = this.color;
		context.rect(this.x, this.y, this.width, this.height);
		context.stroke();
		context.fillText(this.text, this.x + 2, this.y + this.height * .65);
	};
}