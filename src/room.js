var OPEN_SPACES = ["-", "d"];
var ENEMIES = ["e"];

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

	this.xcor = this.x * ((BLOCK_WIDTH * SPACE_SIZE) + BLOCK_DISTANCE);
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
    
    this.spawn_enemies = function() {
    	while(this.floor[this.enemy_x = random_range(1, this.width - 2)][this.enemy_y = random_range(1, this.height - 2)] !== "-");
    	this.enemy = new enemy(this.enemy_x, this.enemy_y, this);
    	this.enemies.push(this.enemy);
    	this.floor[this.enemy_x][this.enemy_y] = "e";
    };

    this.move_player = function(direction) {
        if(this.validate_move(direction)) {
            if(direction === "north") {
                player.y -= 1;
            } else if(direction === "south") {
                player.y += 1;
            } else if(direction === "east") {
                player.x += 1;
            } else if(direction === "west") {
                player.x -= 1;
            }
            if(this.floor[player.x][player.y] === 'd') {
                if(this.north_door !== null && this.north_door[0] === player.x && this.north_door[1] === player.y) {
                    player.current_room = this.north;
                    player.x = this.north.south_door[0];
                    player.y = this.north.south_door[1];
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
            }
        } else if(this.validate_attack(direction)) {
        	for(var i = 0; i < this.enemies.length; i++) {
        		if(direction === "north") {
                	if(this.enemies[i].x === player.x && this.enemies[i].y === player.y - 1) {
                		this.enemies[i].take_damage(player.attack);
                		console.log(this.enemies[i]);
                		if(this.enemies[i].health <= 0) {
                			this.kill(this.enemies[i]);
                		}
                		return;
                	}
            	} else if(direction === "south") {
                	if(this.enemies[i].x === player.x && this.enemies[i].y === player.y + 1) {
                		this.enemies[i].take_damage(player.attack);
                		console.log(this.enemies[i]);
                		if(this.enemies[i].health <= 0) {
                			this.kill(this.enemies[i]);
                		}
                		return;
                	}
            	} else if(direction === "east") {
                	if(this.enemies[i].x === player.x + 1 && this.enemies[i].y === player.y) {
                		this.enemies[i].take_damage(player.attack);
                		console.log(this.enemies[i]);
                		if(this.enemies[i].health <= 0) {
                			this.kill(this.enemies[i]);
                		}
                		return;
                	}
            	} else if(direction === "west") {
                	if(this.enemies[i].x === player.x - 1 && this.enemies[i].y === player.y) {
                		this.enemies[i].take_damage(player.attack);
                		console.log(this.enemies[i]);
                		if(this.enemies[i].health <= 0) {
                			this.kill(this.enemies[i]);
                		}
                		return;
                	}
            	}
        	}
        }
    };
    
    this.kill = function(enemy) {
    	this.floor[enemy.x][enemy.y] = "-";
    	this.enemies.splice(this.enemies.indexOf(enemy), 1);
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

    this.validate_move = function(direction) {
        if(direction === "north") {
            if(typeof this.floor[player.x][player.y - 1] !== 'undefined' && OPEN_SPACES.includes(this.floor[player.x][player.y - 1])) {
                return true;
            }
        } else if(direction === "south") {
            if(typeof this.floor[player.x][player.y + 1] !== 'undefined' && OPEN_SPACES.includes(this.floor[player.x][player.y + 1])) {
                return true;
            }
        } else if(direction === "east") {
            if(typeof this.floor[player.x + 1][player.y] !== 'undefined' && OPEN_SPACES.includes(this.floor[player.x + 1][player.y])) {
                return true;
            }
        } else if(direction === "west") {
            if(typeof this.floor[player.x - 1][player.y] !== 'undefined' && OPEN_SPACES.includes(this.floor[player.x - 1][player.y])) {
                return true;
            }
        }
        return false;
    };
    
    this.validate_attack = function(direction) {
        if(direction === "north") {
            if(typeof this.floor[player.x][player.y - 1] !== 'undefined' && ENEMIES.includes(this.floor[player.x][player.y - 1])) {
                return true;
            }
        } else if(direction === "south") {
            if(typeof this.floor[player.x][player.y + 1] !== 'undefined' && ENEMIES.includes(this.floor[player.x][player.y + 1])) {
                return true;
            }
        } else if(direction === "east") {
            if(typeof this.floor[player.x + 1][player.y] !== 'undefined' && ENEMIES.includes(this.floor[player.x + 1][player.y])) {
                return true;
            }
        } else if(direction === "west") {
            if(typeof this.floor[player.x - 1][player.y] !== 'undefined' && ENEMIES.includes(this.floor[player.x - 1][player.y])) {
                return true;
            }
        }
        return false;
    };

    this.draw = function() {
        context.fillStyle = "#00FF00";
        context.strokeStyle="#00FF00";
        var space_border = 2;
        if(this.seen) {
            context.lineWidth="2";
            if(player.current_room === this) {
                context.rect(this.xcor, this.ycor, this.width * SPACE_SIZE, this.height * SPACE_SIZE);
                context.stroke();
                for(var i = 0; i < this.floor.length; i++) {
                    for(var j = 0; j < this.floor[i].length; j ++) {
                        if(this.floor[i][j] === '-') {
                            context.fillRect(this.xcor + (SPACE_SIZE * i) + space_border, this.ycor + (SPACE_SIZE * j) + space_border, SPACE_SIZE - (space_border * 2), SPACE_SIZE - (space_border * 2));
                        }
                    }
                }
                for(var i = 0; i < this.enemies.length; i++) {
                    this.enemies[i].draw();
                }
            } else {
                context.fillRect(this.xcor, this.ycor, this.width * SPACE_SIZE, this.height * SPACE_SIZE);
            }
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
        }
    };

    this.spawn_links = function() {
        var spawn_weight = 70;
        var relink_weight = 50;
        if(num_rooms > target_num_rooms) {
            return;
        }
        if(random_range(0, 100) <= spawn_weight) {
            if(this.y > 0) {
                if(typeof rooms[x][y - 1] === 'undefined'){
                    this.set_door("north", new room(x, y - 1, random_range(3, 5), random_range(3, 5)));
                    this.north.set_door("south", this);
                    num_rooms += 1;
                    this.north.spawn_links();
                } else if(random_range(0, 100) <= relink_weight){
                    this.set_door("north", rooms[x][y - 1]);
                    this.north.set_door("south", this);
                }
            }
        }
        if(random_range(0, 100) <= spawn_weight) {
            if(this.y < BLOCKS_HEIGHT - 1) {
                if(typeof rooms[x][y + 1] === 'undefined'){
                    this.set_door("south", new room(x, y + 1, random_range(3, 5), random_range(3, 5)));
                    this.south.set_door("north", this);
                    num_rooms += 1;
                    this.south.spawn_links();
                } else if(random_range(0, 100) <= relink_weight){
                    this.set_door("south", rooms[x][y + 1]);
                    this.south.set_door("north", this);
                }
            }
        }
        if(random_range(0, 100) <= spawn_weight) {
            if(this.x < BLOCKS_WIDTH - 1) {
                if(typeof rooms[x + 1][y] === 'undefined'){
                    this.set_door("east", new room(x + 1, y, random_range(3, 5), random_range(3, 5)));
                    this.east.set_door("west", this);
                    num_rooms += 1;
                    this.east.spawn_links();
                } else if(random_range(0, 100) <= relink_weight){
                    this.set_door("east", rooms[x + 1][y]);
                    this.east.set_door("west", this);
                }
            }
        }
        if(random_range(0, 100) <= spawn_weight) {
            if(this.x > 0) {
                if(typeof rooms[x - 1][y] === 'undefined'){
                    this.set_door("west", new room(x - 1, y, random_range(3, 5), random_range(3, 5)));
                    this.west.set_door("east", this);
                    num_rooms += 1;
                    this.west.spawn_links();
                } else if(random_range(0, 100) <= relink_weight){
                    this.set_door("west", rooms[x - 1][y]);
                    this.west.set_door("east", this);
                }
            }
        }
    };

}