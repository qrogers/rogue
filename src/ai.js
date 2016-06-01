function ai() {

	this.seek_and_attack_player = function(enemy) {
		if(are_adjacent(enemy, player)) {
			enemy.attack_enemy(player);
			return [0, 0];
		} else {
			var x_or_y = random_range(0, 1);
			       if(enemy.x < player.x && enemy.y === player.y) {
				return [1, 0];
			} else if(enemy.x > player.x && enemy.y === player.y) {
				return [-1, 0];
			} else if(enemy.y > player.y && enemy.x === player.x) {
				return [0, -1];
			} else if(enemy.y < player.y && enemy.x === player.x) {
				return [0, 1];
			} else if(enemy.x !== player.x) {
				if(x_or_y === 0) {
					if(enemy.x < player.x) {
						return [1, 0];
					} else if(enemy.x > player.x) {
						return [-1, 0];
					}
				} else if(x_or_y === 1) {
					if(enemy.y > player.y) {
						return [0, -1];
					} else if(enemy.y < player.y) {
						return [0, 1];
					}
				}
			} else if(enemy.y > player.y) {
				return [0, -1];
			} else if(enemy.y < player.y) {
				return [0, 1];
			}
		}
		return [0, 0];
	};
	
	this.point_and_attack_player = function(enemy) {
		if(are_adjacent(enemy, player)) {
			enemy.attack_enemy(player);
			return [0, 0];
		} else {
			console.log(enemy.direction);
			if(enemy.direction === 1) {
				enemy.direction = [random_range(0, player.current_room.width - 1), random_range(0, player.current_room.height - 1)];
			}
			if(enemy.x === enemy.direction[0] && enemy.y === enemy.direction[1]) {
				enemy.direction = 1;
				return[0, 0];
			} else if(enemy.x < enemy.direction[0]) {
				return[1, 0];
			} else if(enemy.x > enemy.direction[0]) {
				return[-1, 0];
			} else if(enemy.y < enemy.direction[1]) {
				return[0, 1];
			} else if(enemy.y > enemy.direction[1]) {
				return[0, -1];
			}
		}
		return[0, 0];
	};
	
	this.slow_seek_and_attack_player = function(enemy) {
		if(enemy.direction === 1) {
			enemy.direction = 2;
			return ai_obj.seek_and_attack_player(enemy);
		} else {
			enemy.direction = 1;
			return[0, 0];
		}
	};
	
	this.proximity_and_attack_player = function(enemy) {
		if(are_adjacent(enemy, player)) {
			enemy.attack_enemy(player);
			return [0, 0];
		} else {
			var x_or_y = random_range(0, 1);
			if (Math.abs(enemy.x-player.x) <= 1 && Math.abs(enemy.y-player.y) <= 1) {
				return(ai_obj.seek_and_attack_player(enemy));
			} else {
				return ai_obj.circles(enemy);
			}
		}
		return [0, 0];
	};
	
	this.circles = function(enemy) {
		enemy.direction = (enemy.direction % 4) + 1;
		if (enemy.direction === 1) {
			return [-1,0]; //left
		} else if (enemy.direction == 2) {
			return [0,1]; //down
		} else if (enemy.direction == 3) {
			return [1,0]; //right
		} else if (enemy.direction == 4) {
			return [0,-1]; //up
		} else {
			return [0,0];
		}
	};
	
	this.random_and_attack_player = function(enemy) {
		if(are_adjacent(enemy, player)) {
			enemy.attack_enemy(player);
			return [0, 0];
		} else {
			var rand = random_range(0, 3);
			if(rand === 0) {
				return[1, 0];
			} else if(rand === 1) {
				return[-1, 0];
			} else if(rand === 2) {
				return[0, 1];
			} else if(rand === 3) {
				return[0, -1];
			}
		}
		return [0, 0];
	};
}