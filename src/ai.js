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