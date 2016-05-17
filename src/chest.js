function chest(x, y, event) {
	this.x = x;
	this.y = y;
	this.event = event;
	console.log(this.event);
	
	this.open = function() {
		this.event();
	};
}