//http://people.ucsc.edu/~jqrogers/

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
var BLOCKS_WIDTH  = Math.floor((canvas.width  - HUD_WIDTH  - HUD_BUFFER) / ((BLOCK_WIDTH  * SPACE_SIZE) + BLOCK_DISTANCE));
var BLOCKS_HEIGHT = Math.floor((canvas.height)                           / ((BLOCK_HEIGHT * SPACE_SIZE) + BLOCK_DISTANCE));

var MAIN_COLOR = "#00FF00";
var BACKGROUND_COLOR = "#000000";
var PLAYER_COLOR = "#0000FF";
var ENEMY_COLOR = "#FF0000";
var CHEST_COLOR = "#BBEE00";
var EXIT_COLOR = "#AADDAA";

var TICK_KEY_VALUES = [83, 68, 87, 65];

document.addEventListener("keydown", handle_keypress);
document.addEventListener("mouseup", handle_mouse_up);

var rooms = [];
var player = new player();
var state = "menu";
var hud = new hud(HUD_X, HUD_Y, HUD_WIDTH, HUD_HEIGHT);

//Prevent enemies from moving, used when player enters new room;
var enemy_move_lock = false;

var max_enemies = 2;

new_level();
hud.init_menu();
draw();

function new_level() {
	rooms = [];
	for(var i = 0; i < BLOCKS_WIDTH; i++) {
	    rooms.push([]);
	}
	
	var min_room_width = random_range(3, 5);
	var max_room_width = random_range(6, 9);
	var min_room_height = random_range(3, 5);
	var max_room_height = random_range(6, 9);
	
	var r1 = new room(random_range(0, BLOCKS_WIDTH - 1), random_range(0, BLOCKS_HEIGHT - 1), min_room_width, min_room_height);
	var num_rooms = 1;
	var target_num_rooms = 25;
	
	r1.spawn_links(num_rooms, target_num_rooms, min_room_width, max_room_width, min_room_height, max_room_height);
	
	while(num_rooms < target_num_rooms){ 
	   spawn_rooms(num_rooms, target_num_rooms, min_room_width, max_room_width, min_room_height, max_room_height);
	   num_rooms += 1;
	}
	
	max_enemies += .5;
	spawn_enemies(Math.floor(max_enemies));
	spawn_chests(2);
	player.current_room = r1;
	player.x = 1;
	player.y = 1;
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
	exit_room.floor[random_range(1, exit_room.width - 2)][random_range(1, exit_room.height - 2)] = "x";

	player.health = player.max_health;
}

function spawn_rooms(num_rooms, target_num_rooms, min_width, max_width, min_height, max_height) {
    for(var i = BLOCKS_WIDTH - 1; i >= 0; i--) {
        for(var j = BLOCKS_HEIGHT - 1; j >= 0; j--) {
            if(typeof rooms[i][j] !== "undefined") {
                rooms[i][j].spawn_links(num_rooms, target_num_rooms, min_width, max_width, min_height, max_height);
                return;
            }
        }
    } 
}

function spawn_enemies(quantity) {
	for(var i = BLOCKS_WIDTH - 1; i >= 0; i--){
        for(var j = BLOCKS_HEIGHT - 1; j >= 0; j--) {
            if(typeof rooms[i][j] !== 'undefined') {
                rooms[i][j].spawn_enemies(random_range(0, quantity));
            }
        }
    }
}

function spawn_chests(quantity) {
	while(quantity > 0) {
		var block_x = random_range(0, BLOCKS_WIDTH - 1);
		var block_y = random_range(0, BLOCKS_WIDTH - 1);
	    if(typeof rooms[block_x][block_y] !== 'undefined') {
	    	rooms[block_x][block_y].spawn_chest();
	    	quantity--;
	    }
    }
}

function draw() {
    canvas.width = canvas.width;
    context.fillStyle = BACKGROUND_COLOR;
    context.fillRect(0, 0, canvas.width, canvas.height);
    if(state === "game") {
	    for (var i = 0; i < rooms.length; i++) {
	        for (var j = 0; j < 10; j++) {
	            if(typeof rooms[i][j] !== 'undefined') {
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
