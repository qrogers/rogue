//-: open space, d: door, x: exit, c: chest
var OPEN_SPACES = ["-", "d", "x", "c"];

function room(x, y, width, height) {
    this.north = null;
    this.south = null;
    this.east  = null;
    this.west  = null;

    this.north_door = null;
    this.south_door = null;
    this.east_door  = null;
    this.west_door  = null;

    this.x = x;
    this.y = y;
    this.width  = width;
    this.height = height;

	this.xcor = this.x * ((BLOCK_WIDTH  * SPACE_SIZE) + BLOCK_DISTANCE);
	this.ycor = this.y * ((BLOCK_HEIGHT * SPACE_SIZE) + BLOCK_DISTANCE);

    this.seen = false;

    this.floor = [];
    for(var i = 0; i < this.width; i++) {
        var row = [];
        for(var j = 0; j < this.height; j++) {
            row.push("-");
        }
        this.floor.push(row);
    }

    rooms[x][y] = this;
    
    this.enemies = [];
    this.enemy_x;
    this.enemy_y;
    
    this.chest = null;

    this.ai = new ai();
    
    this.spawn_enemies = function(quantity) {
        if(quantity > (this.width - 2) * (this.height - 2)) {
        	quantity = (this.width - 2) * (this.height - 2);
        }
        var keys = Object.keys(enemies);
        for(var i = 0; i < quantity; i++) {
        	while(this.floor[this.enemy_x = random_range(1, this.width - 2)][this.enemy_y = random_range(1, this.height - 2)] !== "-");
        	this.enemy = new enemy(this.enemy_x, this.enemy_y, this, this.ai.seek_and_attack_player, enemies[keys[keys.length * Math.random() << 0]]);
            this.floor[this.enemy_x][this.enemy_y] = "e";
        	this.enemies.push(this.enemy);
        }
        for(var i = 0; i < this.floor.length; i++) {
            for(var j = 0; j < this.floor[i].length; j ++) {
                if(this.floor[i][j] === "e") {
                    this.floor[i][j] = "-";
                }
            }
        }
    };
    
    //Chest functions
    
    this.chest_gain_xp = function() {
		player.gain_xp(50);
	};
	
	//End chest functions
    
    this.spawn_chest = function() {
    	var chest_x;
    	var chest_y;
    	while(this.floor[chest_x = random_range(1, this.width - 2)][chest_y = random_range(1, this.height - 2)] !== "-");
        this.chest = new chest(chest_x, chest_y, this.chest_gain_xp);
        this.floor[chest_x][chest_y] = "c";
    };

    this.move_enemies = function() {
        if(enemy_move_lock === false) {
	        for(var i = 0; i < this.enemies.length; i++) {
	            var movement = this.enemies[i].move();
	            if(this.validate_move(movement, this.enemies[i])) {
	                this.enemies[i].x += movement[0];
	                this.enemies[i].y += movement[1];
	            }
	        }
	    }   
    };

    this.move_player = function(movement) {
        enemy_move_lock = false;
        if(this.validate_move(movement, player)) {
            if(this.floor[player.x + movement[0]][player.y + movement[1]] === "d") {
            	player.x += movement[0];
            	player.y += movement[1];
                if(this.north_door !== null && this.north_door[0] === player.x && this.north_door[1] === player.y) {
                    player.current_room = this.north;
                    player.x = this.north.south_door[0];
                    player.y = this.north.south_door[1];
                    hud.pop_up_text = ["POPUP", "YAY"];
                } else if(this.south_door !== null && this.south_door[0] === player.x && this.south_door[1] === player.y) {
                    player.current_room = this.south;
                    player.x = this.south.north_door[0];
                    player.y = this.south.north_door[1];
                } else if(this.east_door !== null && this.east_door[0] === player.x && this.east_door[1] === player.y) {
                    player.current_room = this.east;
                    player.x = this.east.west_door[0];
                    player.y = this.east.west_door[1];
                } else if(this.west_door !== null && this.west_door[0] === player.x && this.west_door[1] === player.y) {
                    player.current_room = this.west;
                    player.x = this.west.east_door[0];
                    player.y = this.west.east_door[1];
                }
                player.current_room.seen = true;
                enemy_move_lock = true;
            } else if(this.floor[player.x + movement[0]][player.y + movement[1]] === "c") {
            	this.chest.open();
            	this.floor[this.chest.x][this.chest.y] = "-";
            } else if(this.floor[player.x + movement[0]][player.y + movement[1]] === "x") {
            	next_level();
            } else {
            	player.x += movement[0];
            	player.y += movement[1];
            }
        } else if(this.validate_attack(movement, player)) {
        	for(var i = 0; i < this.enemies.length; i++) {
            	if(this.enemies[i].x === player.x + movement[0] && this.enemies[i].y === player.y + movement[1]) {
            		player.attack_enemy(this.enemies[i]);
            		if(this.enemies[i].health <= 0) {
            			this.kill(this.enemies[i]);
            		}
                    return;
            	}
        	}
        }
    };
    
    this.kill = function(enemy) {
    	this.enemies.splice(this.enemies.indexOf(enemy), 1);
        player.gain_xp(enemy.xp_bounty);
    };

    this.set_door = function(direction, room) {
        if(direction === "north" && this.north === null) {
            this.north = room;
            this.north_door = [random_range(1, this.width - 2), 0];
            this.floor[this.north_door[0]][this.north_door[1]] = 'd';
        } else if(direction === "south" && this.south === null) {
            this.south = room;
            this.south_door = [random_range(1, this.width - 2), this.height - 1];
            this.floor[this.south_door[0]][this.south_door[1]] = 'd';
        } else if(direction === "east" && this.east === null) {
            this.east = room;
            this.east_door = [this.width - 1, random_range(1, this.height - 2)];
            this.floor[this.east_door[0]][this.east_door[1]] = 'd';
        } else if(direction === "west" && this.west === null) {
            this.west = room;
            this.west_door = [0, random_range(1, this.height - 2)];
            this.floor[this.west_door[0]][this.west_door[1]] = 'd';
        }
    };

    this.validate_move = function(movement, unit) {
        if(typeof this.floor[unit.x + movement[0]] !== 'undefined' && typeof this.floor[unit.x + movement[0]][unit.y + movement[1]] !== 'undefined' && OPEN_SPACES.includes(this.floor[unit.x + movement[0]][unit.y + movement[1]])) {
            for(var i = 0; i < this.enemies.length; i++) {
            	if(unit.x + movement[0] === this.enemies[i].x && unit.y + movement[1] === this.enemies[i].y) {
            		return false;
            	}
            }
            return true;
        }
        return false;
    };

    this.validate_attack = function(movement, unit) {
        if(typeof this.floor[unit.x + movement[0]] !== 'undefined' && typeof this.floor[unit.x + movement[0]][unit.y + movement[1]] !== 'undefined') {
            return true;
        }
        return false;
    };

    this.draw = function() {
        context.fillStyle = MAIN_COLOR;
        context.strokeStyle = MAIN_COLOR;
        context.lineWidth="2";
        var space_border = 2;
        if(this.seen || debug) {
            if(player.current_room === this || debug) {
                context.rect(this.xcor, this.ycor, this.width * SPACE_SIZE, this.height * SPACE_SIZE);
                context.stroke();
                for(var i = 0; i < this.floor.length; i++) {
                    for(var j = 0; j < this.floor[i].length; j ++) {
                        if(this.floor[i][j] === "-") {
                        	context.fillStyle = MAIN_COLOR;
                        } else if(this.floor[i][j] === "x") {
                        	context.fillStyle = EXIT_COLOR;
                        } else if(this.floor[i][j] === "c") {
                        	context.fillStyle = CHEST_COLOR;
                        } else {
                        	context.fillStyle = "#000000";
                        }
                        context.fillRect(this.xcor + (SPACE_SIZE * i) + space_border, this.ycor + (SPACE_SIZE * j) + space_border, SPACE_SIZE - (space_border * 2), SPACE_SIZE - (space_border * 2));
                    }
                }
                for(var i = 0; i < this.enemies.length; i++) {
                    this.enemies[i].draw();
                }
            } else {
                context.fillRect(this.xcor, this.ycor, this.width * SPACE_SIZE, this.height * SPACE_SIZE);
            }
            this.draw_doors();
        }
    };

    this.draw_doors = function() {
        if(this.north !== null) {
            context.beginPath();
            context.moveTo(this.x * ((BLOCK_WIDTH * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.north_door[0]) + SPACE_SIZE / 2, this.y * ((BLOCK_HEIGHT * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.north_door[1]));
            context.lineTo(this.north.x * ((BLOCK_WIDTH * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.north.south_door[0]) + SPACE_SIZE / 2, this.north.y * ((BLOCK_HEIGHT * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * (this.north.south_door[1] + 1)));
            context.stroke();
        }
        if(this.south !== null) {
            context.beginPath();
            context.moveTo(this.x * ((BLOCK_WIDTH * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.south_door[0]) + SPACE_SIZE / 2, this.y * ((BLOCK_HEIGHT * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * (this.south_door[1] + 1)));
            context.lineTo(this.south.x * ((BLOCK_WIDTH * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.south.north_door[0]) + SPACE_SIZE / 2, this.south.y * ((BLOCK_HEIGHT * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.south.north_door[1]));
            context.stroke();
        }
        if(this.east !== null) {
            context.beginPath();
            context.moveTo(this.x * ((BLOCK_WIDTH * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * (this.east_door[0] + 1)), this.y * ((BLOCK_HEIGHT * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.east_door[1]) + SPACE_SIZE / 2);
            context.lineTo(this.east.x * ((BLOCK_WIDTH * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.east.west_door[0]), this.east.y * ((BLOCK_HEIGHT * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * (this.east.west_door[1] + 1)) - SPACE_SIZE / 2);
            context.stroke();
        }
        if(this.west !== null) {
            context.beginPath();
            context.moveTo(this.x * ((BLOCK_WIDTH * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.west_door[0]), this.y * ((BLOCK_HEIGHT * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * this.west_door[1]) + SPACE_SIZE / 2);
            context.lineTo(this.west.x * ((BLOCK_WIDTH * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * (this.west.east_door[0] + 1)), this.west.y * ((BLOCK_HEIGHT * SPACE_SIZE) + BLOCK_DISTANCE) + (SPACE_SIZE * (this.west.east_door[1] + 1)) - SPACE_SIZE / 2);
            context.stroke();
        }
    };

    this.spawn_links = function(min_width, max_width, min_height, max_height, spawn_chance, relink_chance) {
        var spawn_weight = spawn_chance;
        var relink_weight = relink_chance;
        var min_room_width = min_width;
        var max_room_width = max_width;
        var min_room_height = min_height;
        var max_room_height = max_height;
        if(num_rooms >= target_num_rooms) {
            return;
        }
        if(random_range(0, 100) <= spawn_weight) {
            if(this.y > 0) {
                if(typeof rooms[x][y - 1] === 'undefined'){
                    this.set_door("north", new room(x, y - 1, random_range(min_room_width, max_room_width), random_range(min_room_height, max_room_height)));
                    this.north.set_door("south", this);
                    num_rooms += 1;
                    if(num_rooms >= target_num_rooms) {
            			return;
        			}
                    this.north.spawn_links(min_width, max_width, min_height, max_height, spawn_weight, relink_weight);
                } else if(random_range(0, 100) <= relink_weight){
                    this.set_door("north", rooms[x][y - 1]);
                    this.north.set_door("south", this);
                }
            }
        }
        if(num_rooms >= target_num_rooms) {
            return;
        }
        if(random_range(0, 100) <= spawn_weight) {
            if(this.y < BLOCKS_HEIGHT - 1) {
                if(typeof rooms[x][y + 1] === 'undefined'){
                    this.set_door("south", new room(x, y + 1, random_range(min_room_width, max_room_width), random_range(min_room_height, max_room_height)));
                    this.south.set_door("north", this);
                    num_rooms += 1;
                    if(num_rooms >= target_num_rooms) {
            			return;
        			}
                    this.south.spawn_links(min_width, max_width, min_height, max_height, spawn_weight, relink_weight);
                } else if(random_range(0, 100) <= relink_weight){
                    this.set_door("south", rooms[x][y + 1]);
                    this.south.set_door("north", this);
                }
            }
        }
        if(num_rooms >= target_num_rooms) {
            return;
        }
        if(random_range(0, 100) <= spawn_weight) {
            if(this.x < BLOCKS_WIDTH - 1) {
                if(typeof rooms[x + 1][y] === 'undefined'){
                    this.set_door("east", new room(x + 1, y, random_range(min_room_width, max_room_width), random_range(min_room_height, max_room_height)));
                    this.east.set_door("west", this);
                    num_rooms += 1;
                    if(num_rooms >= target_num_rooms) {
            			return;
        			}
                    this.east.spawn_links(min_width, max_width, min_height, max_height, spawn_weight, relink_weight);
                } else if(random_range(0, 100) <= relink_weight){
                    this.set_door("east", rooms[x + 1][y]);
                    this.east.set_door("west", this);
                }
            }
        }
        if(num_rooms >= target_num_rooms) {
            return;
        }
        if(random_range(0, 100) <= spawn_weight) {
            if(this.x > 0) {
                if(typeof rooms[x - 1][y] === 'undefined'){
                    this.set_door("west", new room(x - 1, y, random_range(min_room_width, max_room_width), random_range(min_room_height, max_room_height)));
                    this.west.set_door("east", this);
                    num_rooms += 1;
                    if(num_rooms >= target_num_rooms) {
            			return;
        			}
                    this.west.spawn_links(min_width, max_width, min_height, max_height, spawn_weight, relink_weight);
                } else if(random_range(0, 100) <= relink_weight){
                    this.set_door("west", rooms[x - 1][y]);
                    this.west.set_door("east", this);
                }
            }
        }
    };

}