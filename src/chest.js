function chest(x, y, event) {
	this.x = x;
	this.y = y;
	this.event = event;
	
	this.open = function() {
		this.event();
		hud.set_message("code fragments found");
	};
}