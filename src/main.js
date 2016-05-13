canvas = document.getElementById('rogue');
context = canvas.getContext('2d');

//TODO: Use screen size to determine canvas size

var HUD_BUFFER = 10;
var HUD_WIDTH = canvas.width * .2;
var HUD_HEIGHT = canvas.height * .98;
var HUD_X = canvas.width - HUD_WIDTH - HUD_BUFFER;
var HUD_Y = canvas.height - HUD_HEIGHT - HUD_BUFFER;

var BLOCK_WIDTH = 10;
var BLOCK_HEIGHT = 15;
var BLOCK_DISTANCE = 10;
var SPACE_SIZE = 15;
var BLOCKS_WIDTH  =  Math.floor((canvas.width  - HUD_WIDTH  - HUD_BUFFER) / ((BLOCK_WIDTH  * SPACE_SIZE) + BLOCK_DISTANCE));
var BLOCKS_HEIGHT =  Math.floor((canvas.height)                           / ((BLOCK_HEIGHT * SPACE_SIZE) + BLOCK_DISTANCE));

console.log(BLOCKS_WIDTH);
console.log(BLOCKS_HEIGHT);

var TICK_KEY_VALUES = [83, 68, 87, 65];

document.addEventListener("keydown", handle_keypress);
document.addEventListener("mouseup", handle_mouse_up);

var rooms = [];
var player = new player();
var state = "menu";
var hud = new hud(HUD_X, HUD_Y, HUD_WIDTH, HUD_HEIGHT);

new_level();
hud.init_menu();
draw();

function new_level() {
	rooms = [];
	for(var i = 0; i < BLOCKS_WIDTH; i++) {
	    rooms.push([]);
	}
	
	var r1 = new room(random_range(0, BLOCKS_WIDTH - 1), random_range(0, BLOCKS_HEIGHT - 1), BLOCK_WIDTH, BLOCK_HEIGHT);
	var num_rooms = 1;
	var target_num_rooms = 250;
	
	r1.spawn_links(num_rooms, target_num_rooms);
	
	while(num_rooms < target_num_rooms){ 
	   spawn_rooms();
	   num_rooms += 1;
	}
	
	console.log(num_rooms);
	spawn_enemies();
	player.current_room = r1;
	r1.seen = true;
	r1.enemies = [];
	
	var exit_room = null;
	var exit_x;
	var exit_y;
	while(true) {
		exit_x = random_range(0, BLOCKS_WIDTH  - 1);
		exit_y = random_range(0, BLOCKS_HEIGHT - 1);
		if(typeof rooms[exit_x] !== "undefined" && typeof rooms[exit_x][exit_y] !== "undefined") {
			break;
		}
	}
	
	exit_room = rooms[exit_x][exit_y];
	exit_room.floor[random_range(0, exit_room.width - 1)][random_range(0, exit_room.height - 1)] = "x";

	player.health = player.max_health;
}

function spawn_rooms() {
    for(var i = BLOCKS_WIDTH - 1; i >= 0; i--){
        for(var j = BLOCKS_HEIGHT - 1; j >= 0; j--){
            if(typeof rooms[i][j] !== "undefined"){
                rooms[i][j].spawn_links();
                return;
            }
        }
    } 
}

function spawn_enemies() {
	for(var i = BLOCKS_WIDTH - 1; i >= 0; i--){
        for(var j = BLOCKS_HEIGHT - 1; j >= 0; j--){
            if(typeof rooms[i][j] !== 'undefined'){
                rooms[i][j].spawn_enemies(random_range(0, 1));
            }
        }
    }
}

function draw() {
    canvas.width = canvas.width;
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    if(state === "game") {
	    for (var i = 0; i < rooms.length; i++) {
	        for (var j = 0; j < 10; j++) {
	            if(typeof rooms[i][j] !== 'undefined'){
	                rooms[i][j].draw();
	                //console.log(i + " " + j);
	                //console.log(rooms[i][j]);
	            }
	        }
	    }
	 	player.draw();
    }
    hud.draw();
}

function transition_state(new_state) {
	state = new_state;
	if(state === "menu") {
		hud.init_menu();
	}
	draw();
}

function handle_keypress(e) {
    var code = e.keyCode;
    var movement = [0, 0];
    if(code === 83) {
        movement = [0, 1];
    } else if(code === 68) {
        movement = [1, 0];
    } else if(code === 87) {
        movement = [0, -1];
    } else if(code === 65) {
        movement = [-1, 0];
    }
    if(TICK_KEY_VALUES.includes(code)) {
    	player.current_room.move_player(movement);
        player.current_room.move_enemies();
    	draw();
    }
}

function handle_mouse_up(e) {
	for(var i = 0; i < hud.buttons.length; i++) {
		hud.buttons[i].clicked(e.clientX, e.clientY);
	}
}
